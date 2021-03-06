import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({req: req});

    if (!session) {
        res.status(401).json({message: "Not authenticated"});
        return;
    }

    if (req.method == "PATCH") {
        // TODO: Add user ID to user session object
        const user = await prisma.user.findFirst({
            where: {
                email: session.user.email,
            },
            select: {
                id: true
            }
        });

        if (!user) { res.status(404).json({message: 'User not found'}); return; }

        const startMins = req.body.start;
        const endMins = req.body.end;

        const updateDay = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                startTime: startMins,
                endTime: endMins
            },
        });

        res.status(200).json({message: 'Start and end times updated successfully'});
    }
}