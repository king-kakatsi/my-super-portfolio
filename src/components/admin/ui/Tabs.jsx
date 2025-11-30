import { useState, createContext, useContext } from 'react';

/**
 * Tabs Context
 */
const TabsContext = createContext();

/**
 * Tabs Component
 * Tab navigation for organizing content
 * 
 * @param {Object} props
 * @param {string} props.defaultTab - Default active tab ID
 */
const Tabs = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">
        {children}
      </div>
    </TabsContext.Provider>
  );
};

/**
 * Tabs List (Navigation)
 */
Tabs.List = ({ children, className = '' }) => (
  <div className={`flex items-center gap-2 border-b border-white/10 mb-6 ${className}`}>
    {children}
  </div>
);

/**
 * Tab Button
 */
Tabs.Tab = ({ id, children, className = '' }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`
        px-6 py-3 font-medium transition-all duration-300
        border-b-2 
        ${isActive 
          ? 'border-accent text-accent' 
          : 'border-transparent text-text-muted hover:text-text-bright'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
};

/**
 * Tab Panel (Content)
 */
Tabs.Panel = ({ id, children, className = '' }) => {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== id) return null;

  return (
    <div className={`animate-in-up ${className}`}>
      {children}
    </div>
  );
};

export default Tabs;
