// Mock Database Service using LocalStorage

export interface UserProfile {
    id: string;
    name?: string;
    bio?: string;
    faceVerified: boolean;
    interviewSummary?: string;
    preferences?: string;
}

const DB_KEYS = {
    USER: 'luxe_user_profile',
    INTERVIEW: 'luxe_interview_history',
    SESSION: 'luxe_session_active'
};

export const db = {
    saveUser: (profile: Partial<UserProfile>) => {
        const current = db.getUser() || { id: Date.now().toString(), faceVerified: false };
        const updated = { ...current, ...profile };
        localStorage.setItem(DB_KEYS.USER, JSON.stringify(updated));
        return updated;
    },

    getUser: (): UserProfile | null => {
        const data = localStorage.getItem(DB_KEYS.USER);
        return data ? JSON.parse(data) : null;
    },

    saveInterview: (messages: any[]) => {
        localStorage.setItem(DB_KEYS.INTERVIEW, JSON.stringify(messages));
    },

    getInterview: () => {
        const data = localStorage.getItem(DB_KEYS.INTERVIEW);
        return data ? JSON.parse(data) : [];
    },

    setSession: (isActive: boolean) => {
        if (isActive) {
            localStorage.setItem(DB_KEYS.SESSION, 'true');
        } else {
            localStorage.removeItem(DB_KEYS.SESSION);
        }
    },

    isLoggedIn: () => {
        return localStorage.getItem(DB_KEYS.SESSION) === 'true';
    }
};
