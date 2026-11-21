import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_CUSTOMERS,
  INITIAL_PROPERTIES,
  INITIAL_CO_AGENTS,
  INITIAL_DEALS,
  INITIAL_FOLLOWUPS,
  INITIAL_ENQUIRIES,
} from '../data/initialData';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  CUSTOMERS: 'pradhan_crm_customers_v1',
  PROPERTIES: 'pradhan_crm_properties_v1',
  CO_AGENTS: 'pradhan_crm_coagents_v1',
  DEALS: 'pradhan_crm_deals_v1',
  FOLLOWUPS: 'pradhan_crm_followups_v1',
  ENQUIRIES: 'pradhan_crm_enquiries_v1',
  SUPABASE_CONFIG: 'pradhan_crm_supabase_config_v1',
  AUTH: 'pradhan_crm_admin_auth_v1',
};

export const DataProvider = ({ children }) => {
  // Load data with fallback to initial seed
  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  const [properties, setProperties] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure PROP-2000 (Jain Park luxury property) is present
        const hasJainPark = parsed.some(p => p.id === 'PROP-2000');
        if (!hasJainPark && INITIAL_PROPERTIES[0]) {
          return [INITIAL_PROPERTIES[0], ...parsed];
        }
        return parsed;
      }
      return INITIAL_PROPERTIES;
    } catch {
      return INITIAL_PROPERTIES;
    }
  });

  const [coAgents, setCoAgents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CO_AGENTS);
      return saved ? JSON.parse(saved) : INITIAL_CO_AGENTS;
    } catch {
      return INITIAL_CO_AGENTS;
    }
  });

  const [deals, setDeals] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DEALS);
      return saved ? JSON.parse(saved) : INITIAL_DEALS;
    } catch {
      return INITIAL_DEALS;
    }
  });

  const [followups, setFollowups] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FOLLOWUPS);
      return saved ? JSON.parse(saved) : INITIAL_FOLLOWUPS;
    } catch {
      return INITIAL_FOLLOWUPS;
    }
  });

  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
    } catch {
      return INITIAL_ENQUIRIES;
    }
  });

  // Supabase Configuration & Status
  const [supabaseConfig, setSupabaseConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUPABASE_CONFIG);
      return saved ? JSON.parse(saved) : { url: '', anonKey: '', isConnected: false };
    } catch {
      return { url: '', anonKey: '', isConnected: false };
    }
  });

  // Admin Auth Status
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
      return saved ? JSON.parse(saved) : true; // Default logged in for smooth demo experience
    } catch {
      return true;
    }
  });

  // Sync back to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CO_AGENTS, JSON.stringify(coAgents));
  }, [coAgents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEALS, JSON.stringify(deals));
  }, [deals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FOLLOWUPS, JSON.stringify(followups));
  }, [followups]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUPABASE_CONFIG, JSON.stringify(supabaseConfig));
  }, [supabaseConfig]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(isAdminAuthenticated));
  }, [isAdminAuthenticated]);

  // Auth actions
  const loginAdmin = (password) => {
    if (password === 'admin' || password === 'pradhan2025' || password === '1234') {
      setIsAdminAuthenticated(true);
      return { success: true };
    }
    return { success: false, message: 'Invalid Admin Password. Use: admin' };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
  };

  // Helper ID generators
  const generateId = (prefix, list) => {
    const nums = list.map(item => {
      const parts = item.id.split('-');
      return parts[1] ? parseInt(parts[1], 10) : 0;
    }).filter(n => !isNaN(n));
    const nextNum = (nums.length ? Math.max(...nums) : 1000) + 1;
    return `${prefix}-${nextNum}`;
  };

  // ----------------- CUSTOMER CRUD -----------------
  const addCustomer = (customerData) => {
    const newCustomer = {
      ...customerData,
      id: customerData.id || generateId('CUST', customers),
      phone: String(customerData.phone || ''),
      createdDate: customerData.createdDate || new Date().toISOString().split('T')[0],
      status: customerData.status || 'New',
      needsReview: customerData.needsReview || false,
    };
    setCustomers(prev => [newCustomer, ...prev]);
    return newCustomer;
  };

  const updateCustomer = (id, fields) => {
    setCustomers(prev => prev.map(c => (c.id === id ? { ...c, ...fields, phone: String(fields.phone ?? c.phone) } : c)));
  };

  const deleteCustomer = (id) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
    // Also remove related deals/followups
    setFollowups(prev => prev.filter(f => f.customerId !== id));
    setDeals(prev => prev.filter(d => d.customerId !== id));
  };

  // ----------------- PROPERTY CRUD -----------------
  const addProperty = (propData) => {
    const newProperty = {
      ...propData,
      id: propData.id || generateId('PROP', properties),
      dateAdded: propData.dateAdded || new Date().toISOString().split('T')[0],
      availabilityStatus: propData.availabilityStatus || 'Available',
      photos: propData.photos?.length ? propData.photos : [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
      ],
    };
    setProperties(prev => [newProperty, ...prev]);
    return newProperty;
  };

  const updateProperty = (id, fields) => {
    setProperties(prev => prev.map(p => (p.id === id ? { ...p, ...fields } : p)));
  };

  const deleteProperty = (id) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  // ----------------- CO-AGENT CRUD -----------------
  const addCoAgent = (agentData) => {
    const newAgent = {
      ...agentData,
      id: agentData.id || generateId('AGENT', coAgents),
      phone: String(agentData.phone || ''),
      dateAdded: agentData.dateAdded || new Date().toISOString().split('T')[0],
      availability: agentData.availability || 'Active',
    };
    setCoAgents(prev => [newAgent, ...prev]);
    return newAgent;
  };

  const updateCoAgent = (id, fields) => {
    setCoAgents(prev => prev.map(a => (a.id === id ? { ...a, ...fields, phone: String(fields.phone ?? a.phone) } : a)));
  };

  const deleteCoAgent = (id) => {
    setCoAgents(prev => prev.filter(a => a.id !== id));
  };

  // ----------------- DEALS CRUD -----------------
  const addDeal = (dealData) => {
    const newDeal = {
      ...dealData,
      id: dealData.id || generateId('DEAL', deals),
      stage: dealData.stage || 'New Lead',
    };
    setDeals(prev => [newDeal, ...prev]);
    return newDeal;
  };

  const updateDeal = (id, fields) => {
    setDeals(prev => prev.map(d => (d.id === id ? { ...d, ...fields } : d)));
  };

  const deleteDeal = (id) => {
    setDeals(prev => prev.filter(d => d.id !== id));
  };

  // ----------------- FOLLOWUPS CRUD -----------------
  const addFollowup = (followData) => {
    const newFollowup = {
      ...followData,
      id: followData.id || generateId('FOL', followups),
      status: followData.status || 'Pending',
    };
    setFollowups(prev => [newFollowup, ...prev]);
    return newFollowup;
  };

  const updateFollowup = (id, fields) => {
    setFollowups(prev => prev.map(f => (f.id === id ? { ...f, ...fields } : f)));
  };

  const deleteFollowup = (id) => {
    setFollowups(prev => prev.filter(f => f.id !== id));
  };

  // ----------------- ENQUIRIES CRUD -----------------
  const addEnquiry = (enqData) => {
    const newEnquiry = {
      ...enqData,
      id: enqData.id || generateId('ENQ', enquiries),
      phone: String(enqData.phone || ''),
      date: enqData.date || new Date().toISOString().split('T')[0],
      status: 'New',
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    return newEnquiry;
  };

  const updateEnquiry = (id, fields) => {
    setEnquiries(prev => prev.map(e => (e.id === id ? { ...e, ...fields } : e)));
  };

  const deleteEnquiry = (id) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
  };

  const convertEnquiryToCustomer = (enquiryId) => {
    const enq = enquiries.find(e => e.id === enquiryId);
    if (!enq) return;

    const newCustomer = addCustomer({
      name: enq.name,
      phone: enq.phone,
      address: enq.address || '',
      dealType: enq.serviceType === 'Sell' ? 'Sell' : 'Buy',
      budget: enq.budget || '',
      bhk: enq.bhk || '',
      notes: `Converted from public website inquiry: ${enq.message || ''}`,
      status: 'New',
    });

    updateEnquiry(enquiryId, { status: 'Converted to Customer' });
    return newCustomer;
  };

  // ----------------- RESET & EXPORT UTILITIES -----------------
  const resetToInitialData = () => {
    setCustomers(INITIAL_CUSTOMERS);
    setProperties(INITIAL_PROPERTIES);
    setCoAgents(INITIAL_CO_AGENTS);
    setDeals(INITIAL_DEALS);
    setFollowups(INITIAL_FOLLOWUPS);
    setEnquiries(INITIAL_ENQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.CUSTOMERS);
    localStorage.removeItem(STORAGE_KEYS.PROPERTIES);
    localStorage.removeItem(STORAGE_KEYS.CO_AGENTS);
    localStorage.removeItem(STORAGE_KEYS.DEALS);
    localStorage.removeItem(STORAGE_KEYS.FOLLOWUPS);
    localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
  };

  const exportAllDataJSON = () => {
    const data = {
      customers,
      properties,
      coAgents,
      deals,
      followups,
      enquiries,
      exportedAt: new Date().toISOString(),
      appName: 'Pradhan Properties CRM',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pradhan_properties_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDataFromJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.customers) setCustomers(parsed.customers);
      if (parsed.properties) setProperties(parsed.properties);
      if (parsed.coAgents) setCoAgents(parsed.coAgents);
      if (parsed.deals) setDeals(parsed.deals);
      if (parsed.followups) setFollowups(parsed.followups);
      if (parsed.enquiries) setEnquiries(parsed.enquiries);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const exportCSV = (data, filename) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const rows = data.map(obj =>
      headers.map(h => {
        let val = obj[h];
        if (typeof val === 'object' && val !== null) val = JSON.stringify(val);
        val = String(val ?? '').replace(/"/g, '""');
        return `"${val}"`;
      }).join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ----------------- INTELLIGENT MATCHING ENGINE -----------------
  // Helper to extract numerical price from string e.g. "25 Lakhs", "1.25 Crore"
  const parseAmount = (str) => {
    if (!str) return 0;
    const s = String(str).toLowerCase().replace(/,/g, '');
    let mult = 1;
    if (s.includes('cr') || s.includes('crore')) mult = 10000000;
    else if (s.includes('lakh') || s.includes('lac') || s.includes('l')) mult = 100000;
    const match = s.match(/([0-9]+(?:\.[0-9]+)?)/);
    return match ? parseFloat(match[1]) * mult : 0;
  };

  const findMatchesForCustomer = (customer) => {
    if (!customer) return { exact: [], partial: [], alternative: [] };

    const targetBhk = (customer.bhk || '').toLowerCase().trim();
    const targetFloor = (customer.preferredFloor || '').toLowerCase().trim();
    const targetConstruction = (customer.constructionType || '').toLowerCase().trim();
    const notesLower = (customer.notes || '').toLowerCase();
    const targetGaj = (customer.gaj || '').toLowerCase();
    
    // Determine budget range
    let budgetValue = customer.budgetMax || parseAmount(customer.budget);

    // Rule: Never claim an exact match if important details are missing!
    const isMissingCriticalData = !targetBhk || (!budgetValue && !customer.budget) || customer.needsReview;

    const exact = [];
    const partial = [];
    const alternative = [];

    properties.forEach(prop => {
      if (prop.availabilityStatus !== 'Available') return;

      const propBhk = (prop.bhk || '').toLowerCase();
      const propFloor = (prop.floor || '').toLowerCase();
      const propConst = (prop.constructionType || '').toLowerCase();
      const propPrice = prop.price || parseAmount(prop.priceFormatted);
      const propTitleAndNotes = `${prop.title} ${prop.description} ${prop.internalNotes}`.toLowerCase();

      let score = 0;
      const reasons = [];

      // BHK match
      const bhkMatches = targetBhk && propBhk && (propBhk.includes(targetBhk.replace(' bhk', '')) || targetBhk.includes(propBhk.replace(' bhk', '')));
      if (bhkMatches) {
        score += 30;
        reasons.push(`BHK matches (${prop.bhk})`);
      }

      // Construction type match (Jad Se vs Floor)
      const isJadSeRequired = targetConstruction.includes('jad') || notesLower.includes('jad se') || notesLower.includes('jad');
      const isPropJadSe = propConst.includes('jad') || propTitleAndNotes.includes('jad se');
      
      if (isJadSeRequired) {
        if (isPropJadSe) {
          score += 30;
          reasons.push('Exact Jad Se (Pillar to Roof) structure');
        } else {
          score -= 40; // Penalty if strictly wanted Jad Se
        }
      } else if (targetConstruction.includes('floor')) {
        if (!isPropJadSe) {
          score += 15;
          reasons.push('Builder floor configuration');
        }
      }

      // Floor match
      if (targetFloor && !targetFloor.includes('any')) {
        if (propFloor.includes(targetFloor) || targetFloor.includes(propFloor)) {
          score += 20;
          reasons.push(`Floor matches (${prop.floor})`);
        } else if (targetFloor.includes('upper ground') && propFloor.includes('ground')) {
          score += 10;
          reasons.push('Ground / Upper Ground floor alignment');
        }
      }

      // Budget match
      if (budgetValue > 0 && propPrice > 0) {
        const ratio = propPrice / budgetValue;
        if (ratio >= 0.85 && ratio <= 1.15) {
          score += 30;
          reasons.push(`Price strictly within budget (₹${(propPrice/100000).toFixed(1)} Lakhs)`);
        } else if (ratio >= 0.70 && ratio <= 1.35) {
          score += 15;
          reasons.push(`Budget compatible with negotiation (₹${(propPrice/100000).toFixed(1)} Lakhs)`);
        }
      }

      // Gaj match
      if (targetGaj && prop.gaj && prop.gaj.toLowerCase().includes(targetGaj.replace(' gaj', ''))) {
        score += 15;
        reasons.push(`Plot size matches (${prop.gaj})`);
      }

      const matchItem = {
        property: prop,
        score,
        reasons,
      };

      if (!isMissingCriticalData && score >= 75) {
        exact.push(matchItem);
      } else if (score >= 35) {
        partial.push(matchItem);
      } else if (score > 0 || (prop.dealType === 'Sale' && customer.dealType === 'Buy')) {
        alternative.push(matchItem);
      }
    });

    return {
      exact: exact.sort((a, b) => b.score - a.score),
      partial: partial.sort((a, b) => b.score - a.score),
      alternative: alternative.sort((a, b) => b.score - a.score).slice(0, 6),
      isMissingCriticalData,
    };
  };

  // Generate formatted WhatsApp message for sharing property
  const generateWhatsAppMessage = (customer, property) => {
    const greeting = customer?.name ? `Namaste ${customer.name} ji,` : 'Namaste ji,';
    const priceText = property.dealType === 'Rent' 
      ? `Rent: ₹${property.rent?.toLocaleString('en-IN') || property.priceFormatted} / month`
      : `Price: ${property.priceFormatted || '₹' + ((property.price || 0)/100000).toFixed(1) + ' Lakhs'}`;

    return `${greeting}

We have a matching property for your requirement from *PRADHAN PROPERTIES* (West Delhi):

🏠 *${property.title}*
📍 *Location:* ${property.location}
📐 *Size:* ${property.gaj || 'Standard'} (${property.builtUpArea || 'Spacious'})
🛏 *Configuration:* ${property.bhk || 'Residential'}
🏢 *Floor:* ${property.floor || 'Floor'} (${property.constructionType || 'Independent'})
🚗 *Parking:* ${property.parking || 'Available'}
💰 *${priceText}*

${property.description || ''}

✅ Clear registry & title verified
✅ Bank loan assistance available

To schedule a site visit or get more photos/video tour, please reply to this message or call us directly.

*PRADHAN PROPERTIES*
West Delhi & Delhi NCR
📞 9717433469 / 9507363213 / 9319539206`;
  };

  return (
    <DataContext.Provider
      value={{
        customers,
        properties,
        coAgents,
        deals,
        followups,
        enquiries,
        supabaseConfig,
        setSupabaseConfig,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addProperty,
        updateProperty,
        deleteProperty,
        addCoAgent,
        updateCoAgent,
        deleteCoAgent,
        addDeal,
        updateDeal,
        deleteDeal,
        addFollowup,
        updateFollowup,
        deleteFollowup,
        addEnquiry,
        updateEnquiry,
        deleteEnquiry,
        convertEnquiryToCustomer,
        resetToInitialData,
        exportAllDataJSON,
        importDataFromJSON,
        exportCSV,
        findMatchesForCustomer,
        generateWhatsAppMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
