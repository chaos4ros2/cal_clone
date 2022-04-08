import Head from 'next/head'
import Shell from '../components/Shell'
import { signIn, useSession } from 'next-auth/react'

export default function Home() {
    // https://next-auth.js.org/getting-started/upgrade-v4#usesession-hook
    //  const [ session, loading ] = useSession();

    const { data: session, status } = useSession();
    const loading = status === "loading";

    if (session) {
        return (
            <div>
                <Head>
                    <title>Calendso</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Shell heading="Dashboard">
                    <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
                    </div>
                </Shell>
            </div>
        );
    } else {
        return (
            <div>
                <Head>
                    <title>Calendso</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="text-center">
                    <h1 className="text-2xl font-semibold">
                        Welcome to Calendso!
                    </h1>
                    {!session && <>
                        Not signed in <br/>
                        <button onClick={() => signIn()}>Sign in</button>
                    </>}
                </main>
            </div>
        )
    }
}