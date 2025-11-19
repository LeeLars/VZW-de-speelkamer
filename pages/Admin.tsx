
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Activity, ActivityType, TeamMember } from '../types';
import { Trash2, Plus, Edit2, LogOut, Calendar, Users, Save, X, Copy, Coins, Upload, Link as LinkIcon } from 'lucide-react';

const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'speelkamer') {
      onLogin();
    } else {
      setError('Foutief wachtwoord');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">CMS Inloggen</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Wachtwoord</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sk_mint focus:border-transparent outline-none"
              placeholder="Wachtwoord..."
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-sk_mint text-green-900 font-bold py-2 rounded-xl hover:bg-[#a3c98e] transition-colors">
            Inloggen
          </button>
          <p className="text-xs text-center text-gray-400 mt-4">Gebruik code: speelkamer</p>
        </form>
      </div>
    </div>
  );
};

export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'activities' | 'team' | 'pricing'>('activities');
  const { 
    activities, 
    team, 
    locations, 
    pricing,
    deleteActivity, 
    deleteTeamMember, 
    addActivity, 
    updateActivity, 
    addTeamMember, 
    updateTeamMember,
    updatePricing
  } = useData();

  // Modal States
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  
  // Pricing Local State
  const [localPricing, setLocalPricing] = useState(pricing);

  const handleDuplicateActivity = (activity: Activity) => {
    if (window.confirm(`Wil je "${activity.title}" dupliceren?`)) {
      const newActivity = {
        ...activity,
        id: Date.now().toString(),
        title: `${activity.title} (Kopie)`,
      };
      addActivity(newActivity);
    }
  };

  const handleSavePricing = () => {
    updatePricing(localPricing);
    alert('Prijzen succesvol bijgewerkt!');
  };

  if (!isAuthenticated) return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-20">
        <h1 className="text-xl font-bold text-gray-800">De Speelkamer CMS</h1>
        <button onClick={() => setIsAuthenticated(false)} className="text-gray-500 hover:text-red-500 flex items-center gap-2 text-sm font-medium">
          <LogOut size={18} /> Uitloggen
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('activities')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === 'activities' ? 'bg-sk_teal text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            <Calendar size={20} /> Activiteiten & Kampen
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === 'team' ? 'bg-sk_teal text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            <Users size={20} /> Teamleden
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${activeTab === 'pricing' ? 'bg-sk_teal text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            <Coins size={20} /> Tarieven
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6">
          
          {/* ACTIVITIES TAB */}
          {activeTab === 'activities' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Activiteiten Beheer</h2>
                <button 
                  onClick={() => { setEditingActivity(null); setIsActivityModalOpen(true); }}
                  className="bg-sk_mint text-green-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm hover:bg-[#a3c98e]"
                >
                  <Plus size={18} /> Nieuwe Activiteit
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-gray-800 font-semibold">
                    <tr>
                      <th className="p-4 rounded-tl-xl">Datum</th>
                      <th className="p-4">Titel</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Categorie</th>
                      <th className="p-4">Locatie</th>
                      <th className="p-4 rounded-tr-xl text-right">Acties</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {activities.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()).map(activity => (
                      <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium">{new Date(activity.startDate).toLocaleDateString('nl-BE')}</td>
                        <td className="p-4">{activity.title}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${activity.type === ActivityType.CAMP ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                            {activity.type === ActivityType.CAMP ? 'Kamp' : 'Vrije dag'}
                          </span>
                        </td>
                        <td className="p-4">
                          {activity.category && (
                            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              {activity.category}
                            </span>
                          )}
                        </td>
                        <td className="p-4">{locations.find(l => l.id === activity.locationId)?.name || 'Onbekend'}</td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          <button 
                             onClick={() => handleDuplicateActivity(activity)}
                             className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                             title="Dupliceren"
                          >
                             <Copy size={16} />
                          </button>
                          <button 
                             onClick={() => { setEditingActivity(activity); setIsActivityModalOpen(true); }}
                             className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                             title="Bewerken"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => { if(window.confirm('Zeker weten?')) deleteActivity(activity.id) }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            title="Verwijderen"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TEAM TAB */}
          {activeTab === 'team' && (
            <div>
               <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Team Beheer</h2>
                <button 
                  onClick={() => { setEditingTeamMember(null); setIsTeamModalOpen(true); }}
                  className="bg-sk_mint text-green-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm hover:bg-[#a3c98e]"
                >
                  <Plus size={18} /> Teamlid Toevoegen
                </button>
              </div>
              <div className="grid gap-4">
                {team.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                        {member.imageUrl ? (
                          <img src={member.imageUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                            <Users size={20} />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{member.name}</h4>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingTeamMember(member); setIsTeamModalOpen(true); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button>
                      <button onClick={() => deleteTeamMember(member.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRICING TAB */}
          {activeTab === 'pricing' && (
            <div className="max-w-xl">
               <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Tarieven Beheer</h2>
                <p className="text-gray-500 text-sm">Pas hier de standaard prijzen aan voor de voor- en naschoolse opvang.</p>
               </div>

               <div className="space-y-6 bg-gray-50 p-8 rounded-2xl border border-gray-200">
                  <div className="grid gap-6">
                     <div>
                       <label className="label">Standaard Tarief (per begonnen halfuur)</label>
                       <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-500">€</span>
                          <input 
                            type="number" 
                            step="0.10"
                            className="input pl-8" 
                            value={localPricing.standardRate} 
                            onChange={(e) => setLocalPricing({...localPricing, standardRate: parseFloat(e.target.value)})}
                          />
                       </div>
                     </div>

                     <div>
                       <label className="label">Middagtoezicht (per middag)</label>
                       <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-500">€</span>
                          <input 
                            type="number" 
                            step="0.10"
                            className="input pl-8" 
                            value={localPricing.noonRate} 
                            onChange={(e) => setLocalPricing({...localPricing, noonRate: parseFloat(e.target.value)})}
                          />
                       </div>
                     </div>
                  </div>

                  <button 
                     onClick={handleSavePricing}
                     className="w-full bg-sk_teal text-white font-bold py-3 rounded-xl hover:bg-[#3d94a5] flex items-center justify-center gap-2"
                  >
                     <Save size={18} /> Opslaan
                  </button>
               </div>
            </div>
          )}

        </div>
      </div>

      {/* --- MODALS --- */}
      
      {/* Activity Modal */}
      {isActivityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
           <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {editingActivity ? 'Activiteit Bewerken' : 'Nieuwe Activiteit'}
                </h3>
                <button onClick={() => setIsActivityModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
              
              <ActivityForm 
                initialData={editingActivity} 
                onSubmit={(data) => {
                  if (editingActivity) updateActivity({ ...editingActivity, ...data });
                  else addActivity({ ...data, id: Date.now().toString() } as Activity);
                  setIsActivityModalOpen(false);
                }}
              />
           </div>
        </div>
      )}

      {/* Team Modal */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
           <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {editingTeamMember ? 'Teamlid Bewerken' : 'Nieuw Teamlid'}
                </h3>
                <button onClick={() => setIsTeamModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
              
              <TeamForm 
                initialData={editingTeamMember} 
                onSubmit={(data) => {
                  if (editingTeamMember) updateTeamMember({ ...editingTeamMember, ...data });
                  else addTeamMember({ ...data, id: Date.now().toString() } as TeamMember);
                  setIsTeamModalOpen(false);
                }}
              />
           </div>
        </div>
      )}

    </div>
  );
};

// --- Form Components (Internal) ---

const ActivityForm: React.FC<{ initialData: Activity | null, onSubmit: (data: any) => void }> = ({ initialData, onSubmit }) => {
  const { locations } = useData();
  
  // Find VBS De Frères location
  const defaultLocation = locations.find(l => l.name === 'VBS De Frères')?.id || locations[0]?.id || '';
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    type: initialData?.type || ActivityType.CAMP,
    category: initialData?.category || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    locationId: initialData?.locationId || defaultLocation,
    hours: initialData?.hours || '09:00 - 16:00',
    price: '€12 (halve dag) / €23 (volle dag)', // Standaard prijs
    description: initialData?.description || '',
    googleFormUrl: initialData?.googleFormUrl || '',
    imageUrl: '', // Geen afbeelding
  });

  const [customCategory, setCustomCategory] = useState(false);

  // Auto-generate title from dates
  const generateTitle = () => {
    if (!formData.startDate) return '';
    
    const start = new Date(formData.startDate);
    const categoryName = formData.category || (formData.type === ActivityType.CAMP ? 'Vakantiekamp' : 'Vrije dag');
    
    if (formData.endDate) {
      const end = new Date(formData.endDate);
      const startDay = start.getDate();
      const endDay = end.getDate();
      const month = start.toLocaleDateString('nl-BE', { month: 'long' });
      const year = start.getFullYear();
      
      // Check if same month
      if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
        return `${categoryName} ${startDay} t/m ${endDay} ${month} ${year}`;
      } else {
        // Different months
        const endMonth = end.toLocaleDateString('nl-BE', { month: 'long' });
        const endYear = end.getFullYear();
        return `${categoryName} ${startDay} ${month} t/m ${endDay} ${endMonth} ${endYear}`;
      }
    }
    
    // Single day
    const formatted = start.toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' });
    return `${categoryName} ${formatted}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = generateTitle();
    onSubmit({ ...formData, title });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
       {/* Type Selection */}
       <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <label className="label mb-3">Type Activiteit *</label>
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              onClick={() => setFormData({...formData, type: ActivityType.CAMP, category: 'Vakantiekamp', hours: '09:00 - 16:00', description: 'Een week vol avontuur en plezier!'})}
              className={`p-4 rounded-xl font-bold text-sm transition-all border-2 ${
                formData.type === ActivityType.CAMP 
                  ? 'bg-sk_yellow border-sk_yellow text-yellow-900 shadow-md' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-sk_yellow'
              }`}
            >
              <div className="text-2xl mb-1">🏕️</div>
              Vakantiekamp
            </button>
            <button 
              type="button"
              onClick={() => setFormData({...formData, type: ActivityType.FREE_DAY, category: '', hours: '08:00 - 18:00', description: 'Opvang tijdens een vrije dag.'})}
              className={`p-4 rounded-xl font-bold text-sm transition-all border-2 ${
                formData.type === ActivityType.FREE_DAY 
                  ? 'bg-sk_teal border-sk_teal text-white shadow-md' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-sk_teal'
              }`}
            >
              <div className="text-2xl mb-1">📅</div>
              Vrije Dag
            </button>
          </div>
       </div>

       {/* Category Selection (only for FREE_DAY) */}
       {formData.type === ActivityType.FREE_DAY && (
         <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <label className="label mb-3">Categorie Vrije Dag</label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button 
                type="button"
                onClick={() => { setFormData({...formData, category: 'Pedagogische studiedag'}); setCustomCategory(false); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  formData.category === 'Pedagogische studiedag' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-blue-100'
                }`}
              >
                📚 Pedagogische studiedag
              </button>
              <button 
                type="button"
                onClick={() => { setFormData({...formData, category: 'Facultatieve vrije dag'}); setCustomCategory(false); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  formData.category === 'Facultatieve vrije dag' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-blue-100'
                }`}
              >
                🌟 Facultatieve vrije dag
              </button>
              <button 
                type="button"
                onClick={() => { setFormData({...formData, category: 'Brugdag'}); setCustomCategory(false); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  formData.category === 'Brugdag' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-blue-100'
                }`}
              >
                🌉 Brugdag
              </button>
              <button 
                type="button"
                onClick={() => { setCustomCategory(true); setFormData({...formData, category: ''}); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  customCategory 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-blue-100'
                }`}
              >
                ✏️ Eigen categorie
              </button>
            </div>
            {customCategory && (
              <input 
                name="category"
                className="input text-sm" 
                value={formData.category} 
                onChange={handleChange}
                placeholder="bv. Carnavalsvakantie, Kerstmis, ..."
              />
            )}
         </div>
       )}

       {/* Compact Form */}
       <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Start Datum *</label>
            <input type="date" name="startDate" required className="input" value={formData.startDate} onChange={handleChange} />
          </div>
          
          <div>
            <label className="label">Eind Datum (optioneel)</label>
            <input type="date" name="endDate" className="input" value={formData.endDate} onChange={handleChange} />
          </div>

          <div className="col-span-2">
            <label className="label">Locatie</label>
            <select name="locationId" className="input" value={formData.locationId} onChange={handleChange}>
              {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>

          <div className="col-span-2">
            <label className="label">Uren</label>
            <input name="hours" className="input" value={formData.hours} onChange={handleChange} placeholder="bv. 09:00 - 16:00" />
          </div>

          <div className="col-span-2">
            <label className="label">Omschrijving</label>
            <textarea name="description" className="input h-20 text-sm" value={formData.description} onChange={handleChange} placeholder="Korte beschrijving van de activiteit..." />
          </div>

          <div className="col-span-2">
            <label className="label">Google Form Link *</label>
            <input name="googleFormUrl" required className="input" value={formData.googleFormUrl} onChange={handleChange} placeholder="https://forms.gle/..." />
          </div>
       </div>

       {/* Preview Title */}
       {formData.startDate && (
         <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm">
           <span className="font-medium text-blue-900">Titel wordt: </span>
           <span className="text-blue-700">{generateTitle()}</span>
         </div>
       )}

       <div className="flex gap-2 pt-2">
         <button type="submit" className="flex-1 bg-sk_teal text-white font-bold py-3 rounded-xl hover:bg-[#3d94a5] transition-colors">
           Activiteit Opslaan
         </button>
       </div>
    </form>
  );
};

const TeamForm: React.FC<{ initialData: TeamMember | null, onSubmit: (data: any) => void }> = ({ initialData, onSubmit }) => {
  const { locations } = useData();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    imageUrl: initialData?.imageUrl || '',
    locationIds: initialData?.locationIds || [locations[0]?.id || '']
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-4">
      <div>
        <label className="label">Naam</label>
        <input name="name" required className="input" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label className="label">Functie</label>
        <input name="role" required className="input" value={formData.role} onChange={handleChange} />
      </div>
      
      <div>
        <label className="label">Foto</label>
        
        <div className="flex items-start gap-4 mt-2">
           {/* Preview */}
           <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden border border-gray-200 shrink-0 flex items-center justify-center relative">
              {formData.imageUrl ? (
                <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Users size={24} className="text-gray-300" />
              )}
           </div>
           
           {/* Inputs */}
           <div className="flex-grow space-y-3">
             <div className="relative">
                <input 
                  name="imageUrl" 
                  className="input text-sm pl-9" 
                  value={formData.imageUrl} 
                  onChange={handleChange} 
                  placeholder="/images/naam.jpg" 
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <LinkIcon size={14} className="text-gray-400" />
                </div>
             </div>

             <div className="flex gap-2">
                <label className="cursor-pointer bg-sk_mint/10 text-sk_mint hover:bg-sk_mint/20 px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2">
                    <Upload size={14} /> Upload Foto
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <div className="text-[10px] text-gray-400 flex items-center">
                   Of typ pad naar 'public/images/...'
                </div>
             </div>
           </div>
        </div>
      </div>

      <div className="pt-4">
         <button type="submit" className="w-full bg-sk_teal text-white font-bold py-3 rounded-xl hover:bg-[#3d94a5]">Opslaan</button>
       </div>
    </form>
  );
}

// Styles
const style = document.createElement('style');
style.textContent = `
  .label { display: block; font-size: 0.875rem; font-weight: 500; color: #4b5563; margin-bottom: 0.25rem; }
  .input { width: 100%; padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 0.75rem; outline: none; transition: border-color 0.2s; }
  .input:focus { border-color: #4AB1C4; ring: 2px solid #4AB1C4; }
`;
document.head.appendChild(style);
