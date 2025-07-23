import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definición de tipo para recursos
export type Resource = {
  id: string;
  title: string;
  description: string;
  type: "document" | "video" | "audio" | "link";
  accessLevel: "free" | "paid";
  thumbnail: string;
};

interface ResourcesContextType {
  resources: Resource[];
  addResource: (resource: Omit<Resource, 'id'>) => void;
  deleteResource: (id: string) => void;
}

const ResourcesContext = createContext<ResourcesContextType | undefined>(undefined);

export const useResources = () => {
  const context = useContext(ResourcesContext);
  if (context === undefined) {
    throw new Error('useResources debe ser usado dentro de un ResourcesProvider');
  }
  return context;
};

interface ResourcesProviderProps {
  children: ReactNode;
}

export const ResourcesProvider: React.FC<ResourcesProviderProps> = ({ children }) => {
  const [resources, setResources] = useState<Resource[]>([]);

  const addResource = (resource: Omit<Resource, 'id'>) => {
    const newResource = {
      ...resource,
      id: Date.now().toString(), // Generar un ID único basado en timestamp
      thumbnail: resource.thumbnail || '/placeholder.svg', // Usar un placeholder si no hay thumbnail
    };
    
    setResources(prevResources => [...prevResources, newResource]);
  };

  const deleteResource = (id: string) => {
    setResources(prevResources => prevResources.filter(resource => resource.id !== id));
  };

  return (
    <ResourcesContext.Provider value={{ resources, addResource, deleteResource }}>
      {children}
    </ResourcesContext.Provider>
  );
};
