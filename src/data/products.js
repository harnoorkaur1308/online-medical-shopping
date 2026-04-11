
export const products = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "fever",
    price: 45,
    emoji: "💊",
    description: "For fever & mild pain relief",
  },
  {
    id: 2,
    name: "Ibuprofen 400mg",
    category: "pain",
    price: 60,
    emoji: "💊",
    description: "Anti-inflammatory pain relief",
  },
  {
    id: 3,
    name: "Cough Syrup 100ml",
    category: "cough",
    price: 120,
    emoji: "🧴",
    description: "Soothes dry & wet cough",
  },
  {
    id: 4,
    name: "Vitamin C 1000mg",
    category: "vitamins",
    price: 199,
    emoji: "🟠",
    description: "Boosts immunity & energy",
  },
  {
    id: 5,
    name: "Antacid Tablets",
    category: "digestion",
    price: 85,
    emoji: "💊",
    description: "Quick relief from acidity",
  },
  {
    id: 6,
    name: "Cetirizine 10mg",
    category: "allergy",
    price: 55,
    emoji: "💊",
    description: "Antihistamine for allergies",
  },
  {
    id: 7,
    name: "Multivitamin Capsules",
    category: "vitamins",
    price: 350,
    emoji: "🟡",
    description: "Daily essential nutrients",
  },
  {
    id: 8,
    name: "Bandage Roll",
    category: "first-aid",
    price: 40,
    emoji: "🩹",
    description: "Sterile wound dressing",
  },
  {
    id: 9,
    name: "Hand Sanitizer 500ml",
    category: "hygiene",
    price: 150,
    emoji: "🧴",
    description: "70% alcohol-based sanitizer",
  },
  {
    id: 10,
    name: "Thermometer",
    category: "device",
    price: 299,
    emoji: "🌡️",
    description: "Digital body thermometer",
  },
  {
    id: 11,
    name: "Omeprazole 20mg",
    category: "digestion",
    price: 95,
    emoji: "💊",
    description: "Reduces stomach acid",
  },
  {
    id: 12,
    name: "Zinc Tablets",
    category: "vitamins",
    price: 130,
    emoji: "🔵",
    description: "Supports immune function",
  },
];


export const suggestions = {
  fever: {
    message: "🌡️ Having fever? Also consider:",
    suggestedId: 10,
  },
  cough: {
    message: "😷 For cough relief, try:",
    suggestedId: 4, 
  },
  pain: {
    message: "💪 Managing pain? You might need:",
    suggestedId: 8, 
  },
  allergy: {
    message: "🌿 For allergy support, consider:",
    suggestedId: 4, 
  },
  digestion: {
    message: "🫄 For digestive health, also try:",
    suggestedId: 5, 
  },
  vitamins: {
    message: "⚡ Boosting health? Also add:",
    suggestedId: 12, 
  },
  "first-aid": {
    message: "🩺 For first aid, you may also need:",
    suggestedId: 9, 
  },
  hygiene: {
    message: "🧼 Staying clean? Add these too:",
    suggestedId: 8, 
  },
  device: {
    message: "🔍 Monitoring health? Also check:",
    suggestedId: 1, 
  },
};


export const mockUser = {
  name: "Rahul Sharma",
  email: "rahul.sharma@email.com",
  phone: "+91 98765 43210",
  address: "42, Green Park Colony",
  city: "New Delhi",
  pincode: "110016",
};
