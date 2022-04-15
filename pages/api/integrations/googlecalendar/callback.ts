import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';
const {google} = require('googleapis');

const credentials = process.env.GOOGLE_API_CREDENTIALS;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code } = req.query

    // Check that user is authenticated
    const session = await getSession({req: req});

    if (!session) { res.status(401).json({message: 'You must be logged in to do this'}); return; }

    // TODO: Add user ID to user session object
    const user = await prisma.user.findFirst({
        where: {
            email: session.user.email,
        },
        select: {
            id: true
        }
    });

    const {client_secret, client_id, redirect_uris} = JSON.parse(credentials).web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Convert to token
    oAuth2Client.getToken(code, async (err, token) => {
        if (err) return console.error('Error retrieving access token', err);

        const credential = await prisma.credential.create({
            data: {
                type: 'google_calendar',
                key: token,
                userId: user.id
            }
        });
    });

    // Add the credential

    res.redirect('/integrations');
}