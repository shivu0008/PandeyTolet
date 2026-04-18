import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { 
  Plus, Image as ImageIcon, Trash2, 
  Tag, Star, Zap
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'listings' | 'reviews'>('listings');
  const [properties, setProperties] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Cloudinary Config
  const CLOUDINARY_CLOUD_NAME = "dexqeesvl";
  const CLOUDINARY_UPLOAD_PRESET = "PandeyTolet";

  const [formData, setFormData] = useState({
    title: '', price: '', location: '', type: 'Rent',
    category: 'Residential', beds: '', baths: '', featured: false
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchProperties();
        fetchReviews();
      } else {
        navigate('/admin-login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchProperties = async () => {
    try {
      const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProperties(data);
    } catch (err) { console.error(err); }
  };

  const fetchReviews = async () => {
    try {
      const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(data);
    } catch (err) { console.error(err); }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin-login');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 10);
      setSelectedFiles(files);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const options = { maxSizeMB: 0.8, maxWidthOrHeight: 1280, useWebWorker: true };
    const compressedFile = await imageCompression(file, options);
    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return alert('Please select images!');
    setUploading(true);
    try {
      const imageUrls = [];
      for (const file of selectedFiles) {
        const url = await uploadToCloudinary(file);
        imageUrls.push(url);
      }
      await addDoc(collection(db, 'properties'), {
        ...formData,
        images: imageUrls,
        image: imageUrls[0],
        createdAt: new Date().toISOString(),
        beds: formData.category === 'Residential' ? Number(formData.beds) : 0,
        baths: formData.category === 'Residential' ? Number(formData.baths) : 0,
        status: 'Available'
      });
      setSuccess('Published!');
      setFormData({ title: '', price: '', location: '', type: 'Rent', category: 'Residential', beds: '', baths: '', featured: false });
      setSelectedFiles([]); setPreviews([]);
      fetchProperties();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) { setError(err.message); } finally { setUploading(false); }
  };

  const toggleStatus = async (property: any) => {
    const newStatus = property.status === 'Available' ? (property.type === 'Rent' ? 'Rented Out' : 'Sold') : 'Available';
    try {
      await updateDoc(doc(db, 'properties', property.id), { status: newStatus });
      fetchProperties();
    } catch (err) { alert('Failed'); }
  };

  const handleDeleteProperty = async (id: string) => {
    if (!window.confirm('Delete listing?')) return;
    try {
      await deleteDoc(doc(db, 'properties', id));
      fetchProperties();
    } catch (err) { alert('Failed'); }
  };

  const handleDeleteReview = async (id: string) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await deleteDoc(doc(db, 'reviews', id));
      fetchReviews();
    } catch (err) { alert('Failed'); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#020D1A]"><div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020D1A] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-primary dark:text-white tracking-tighter uppercase italic">Admin Panel</h1>
            <div className="flex gap-4 mt-4">
              <button 
                onClick={() => setActiveTab('listings')}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'listings' ? 'bg-accent text-primary' : 'bg-white/5 text-gray-400'}`}
              >
                Listings
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'reviews' ? 'bg-accent text-primary' : 'bg-white/5 text-gray-400'}`}
              >
                Reviews ({reviews.length})
              </button>
            </div>
          </div>
          <button onClick={handleLogout} className="bg-red-500/10 text-red-500 px-6 py-2 rounded-xl font-black text-xs hover:bg-red-500 hover:text-white transition-all text-shadow-sm">Logout</button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'listings' ? (
            <motion.div key="listings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <div className="glass-morph p-8 rounded-[3rem] border-white/10 sticky top-32">
                  <h2 className="text-2xl font-black text-primary dark:text-white uppercase italic mb-8 flex items-center gap-2"><Plus className="text-accent" /> Post New Flat</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Title" required className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 dark:text-white font-bold text-sm" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Price" required className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 dark:text-white font-bold text-sm" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                      <input type="text" placeholder="Locality" required className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 dark:text-white font-bold text-sm" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <select className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-2xl p-4 text-slate-900 dark:text-white font-black text-sm" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                        <option value="Rent">FOR RENT</option><option value="Buy">FOR BUY</option>
                      </select>
                      <select className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-2xl p-4 text-slate-900 dark:text-white font-black text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                        <option value="Residential">RESIDENTIAL</option><option value="Commercial">COMMERCIAL</option>
                      </select>
                    </div>
                    {formData.category === 'Residential' && (
                      <div className="grid grid-cols-2 gap-4">
                        <input type="number" placeholder="Beds" required className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 dark:text-white font-bold text-sm" value={formData.beds} onChange={e => setFormData({...formData, beds: e.target.value})} />
                        <input type="number" placeholder="Baths" required className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 dark:text-white font-bold text-sm" value={formData.baths} onChange={e => setFormData({...formData, baths: e.target.value})} />
                      </div>
                    )}
                    <div className="relative border-2 border-dashed border-gray-300 dark:border-white/20 rounded-2xl p-6 text-center hover:border-accent">
                      <input type="file" accept="image/*" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                      <ImageIcon className="mx-auto text-accent mb-2" size={24} />
                      <p className="text-[10px] font-black uppercase text-gray-500">{uploading ? 'Processing...' : `Select Photos (${selectedFiles.length})`}</p>
                    </div>
                    {previews.length > 0 && <div className="flex flex-wrap gap-2 py-2">{previews.map((url, i) => <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border border-accent/20"><img src={url} className="w-full h-full object-cover" /></div>)}</div>}
                    {error && <div className="text-red-500 text-[10px] font-bold uppercase">{error}</div>}
                    {success && <div className="text-green-500 text-[10px] font-bold uppercase">{success}</div>}
                    <button type="submit" disabled={uploading || selectedFiles.length === 0} className="w-full btn-shiny !bg-accent !text-primary !py-4 rounded-2xl font-black uppercase tracking-widest text-xs">Publish Listing</button>
                  </form>
                </div>
              </div>
              <div className="lg:col-span-7">
                <h3 className="text-xl font-black text-primary dark:text-white uppercase italic mb-8 px-4 flex items-center gap-2"><Zap size={20} className="text-accent" /> Live Listings</h3>
                <div className="space-y-4">
                  {properties.map((p) => (
                    <div key={p.id} className={`bg-white dark:bg-slate-900 p-4 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-xl flex gap-4 items-center group ${p.status !== 'Available' ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                      <img src={p.image} className="w-20 h-20 rounded-xl object-cover shadow-lg" />
                      <div className="flex-grow">
                        <h4 className="font-black text-sm dark:text-white uppercase tracking-tight">{p.title}</h4>
                        <div className="flex items-center gap-3 mt-1"><p className="text-accent font-bold text-xs">{p.price}</p><span className={`text-[8px] px-2 py-0.5 rounded font-black uppercase ${p.status === 'Available' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{p.status}</span></div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => toggleStatus(p)} className="p-3 text-primary dark:text-white bg-gray-100 dark:bg-white/5 rounded-xl hover:bg-accent hover:text-primary shadow-md"><Tag size={18} /></button>
                        <button onClick={() => handleDeleteProperty(p.id)} className="p-3 text-red-500 bg-red-500/5 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-md"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="reviews" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-4xl mx-auto">
              <h3 className="text-xl font-black text-primary dark:text-white uppercase italic mb-8 px-4 flex items-center gap-2"><Star size={20} className="text-accent" /> Customer Reviews</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((r) => (
                  <div key={r.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl relative group">
                    <div className="flex gap-1 mb-4 text-accent">
                      {[...Array(r.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 font-bold mb-6 italic leading-relaxed">"{r.comment}"</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="font-black text-primary dark:text-white uppercase tracking-tighter italic">{r.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">{new Date(r.createdAt).toLocaleDateString()}</p>
                      </div>
                      <button onClick={() => handleDeleteReview(r.id)} className="p-3 text-red-500 bg-red-500/5 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
