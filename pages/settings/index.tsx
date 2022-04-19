import { useRouter } from 'next/router';
import { signIn, useSession, getSession } from 'next-auth/react';

export default function Settings() {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const router = useRouter();

    if (loading) {
        return <p className="text-gray-400">Loading...</p>;
    } else {
        if (!session) {
            window.location.href = "/auth/login";
        }
    }

    router.push('/settings/profile');

    return null;
}