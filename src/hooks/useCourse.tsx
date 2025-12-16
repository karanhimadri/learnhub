"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export type CreateCourseInput = {
  title: string;
  instructor: string;
  skills: string[];
  level: CourseLevel;
  category: string;
  duration: string;
  price: number;
  isPublic: boolean;
};

export type InstructorCourse = {
  _id: string;
  title: string;
  instructor: string;
  skills: string[];
  level: CourseLevel;
  category: string;
  duration: string;
  price: number;
  isPublic: boolean;
  rating: number;
  ratingCount: number;
  createdAt: string;
  updatedAt: string;
};

export type PublicCourse = {
  id: string;
  title: string;
  instructor: string;
  skills: string[];
  level: CourseLevel;
  category: string;
  duration: string;
  price: number;
  rating: number;
  ratingCount: number;
};

export type InstructorCourseStats = {
  total: number;
  public: number;
  draft: number;
  free: number;
  paid: number;
};

export type UpdateCourseInput = Partial<{
  title: string;
  skills: string[];
  level: CourseLevel;
  category: string;
  duration: string;
  price: number;
  isPublic: boolean;
}>;

type CourseContextValue = {
  creating: boolean;
  error: string | null;
  createCourse: (payload: CreateCourseInput) => Promise<void>;
  fetchPublicCourses: () => Promise<PublicCourse[]>;
  fetchInstructorCourses: () => Promise<InstructorCourse[]>;
  fetchInstructorStats: () => Promise<InstructorCourseStats>;
  fetchInstructorCourse: (courseId: string) => Promise<InstructorCourse>;
  updateInstructorCourse: (
    courseId: string,
    payload: UpdateCourseInput
  ) => Promise<InstructorCourse>;
};

const CourseContext = createContext<CourseContextValue | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCourse = useCallback(async (payload: CreateCourseInput) => {
    setCreating(true);
    setError(null);

    try {
      const res = await fetch("/api/instructor/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const message = (data && data.message) || "Failed to create course";
        setError(message);
        throw new Error(message);
      }
    } finally {
      setCreating(false);
    }
  }, []);

  const fetchPublicCourses = useCallback(async () => {
    setError(null);

    const res = await fetch("/api/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const message = (data && data.message) || "Failed to load courses";
      setError(message);
      throw new Error(message);
    }

    return (data?.courses || []) as PublicCourse[];
  }, []);

  const fetchInstructorCourses = useCallback(async () => {
    setError(null);

    const res = await fetch("/api/instructor/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const message = (data && data.message) || "Failed to load courses";
      setError(message);
      throw new Error(message);
    }

    return (data?.courses || []) as InstructorCourse[];
  }, []);

  const fetchInstructorStats = useCallback(async () => {
    setError(null);

    const res = await fetch("/api/instructor/courses/stats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const message = (data && data.message) || "Failed to load course stats";
      setError(message);
      throw new Error(message);
    }

    return (data?.stats || {
      total: 0,
      public: 0,
      draft: 0,
      free: 0,
      paid: 0,
    }) as InstructorCourseStats;
  }, []);

  const fetchInstructorCourse = useCallback(async (courseId: string) => {
    setError(null);

    const res = await fetch(`/api/instructor/courses/${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const message = (data && data.message) || "Failed to load course";
      setError(message);
      throw new Error(message);
    }

    return data.course as InstructorCourse;
  }, []);

  const updateInstructorCourse = useCallback(
    async (courseId: string, payload: UpdateCourseInput) => {
      setError(null);

      const res = await fetch(`/api/instructor/courses/${courseId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const message = (data && data.message) || "Failed to update course";
        setError(message);
        throw new Error(message);
      }

      return data.course as InstructorCourse;
    },
    []
  );

  const value: CourseContextValue = {
    creating,
    error,
    createCourse,
    fetchPublicCourses,
    fetchInstructorCourses,
    fetchInstructorStats,
    fetchInstructorCourse,
    updateInstructorCourse,
  };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
}

export function useCourse() {
  const ctx = useContext(CourseContext);
  if (!ctx) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return ctx;
}
