import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ProjectContextType = {
  projectId: string | null;
  setProjectId: (id: string | null) => void;
  transcriptId: string | null;
  setTranscriptId: (id: string | null) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projectId, setProjectIdState] = useState<string | null>(null);
  const [transcriptId, setTranscriptIdState] = useState<string | null>(null);

  // Load from localStorage on first render
  useEffect(() => {
    const storedProjectId = localStorage.getItem("projectId");
    if (storedProjectId) {
      setProjectIdState(storedProjectId);
    }

    const storedTranscriptId = localStorage.getItem("transcriptId");
    if (storedTranscriptId) {
      setTranscriptIdState(storedTranscriptId);
    }
  }, []);

  // Wrapper to update both state and localStorage
  const setProjectId = (id: string | null) => {
    setProjectIdState(id);
    if (id) {
      localStorage.setItem("projectId", id);
    } else {
      localStorage.removeItem("projectId");
    }
  };

  const setTranscriptId = (id: string | null) => {
    setTranscriptIdState(id);
    if (id) {
      localStorage.setItem("transcriptId", id);
    } else {
      localStorage.removeItem("transcriptId");
    }
  };

  return (
    <ProjectContext.Provider value={{ projectId, setProjectId, transcriptId, setTranscriptId }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
