import { useState } from 'react';
import linkService from '../../services/linkService';
import { useSession } from '../../contexts/SessionContext'

export default function linkViewModel() {
    const service = linkService();
    const session = useSession();

    const [links, setLinks] = useState([])

    async function fetchLinks() {
        try {
            const links = await service.fetchLinks()
            setLinks(links)
        } catch (error) {
            console.error('Error fetching links:', error)
        }
    }

    async function createLink(newLink) {
        try {
            const link = await service.createLink(newLink)
            setLinks([...links, link])
        } catch (error) {
            console.error('Error creating link:', error)
        }
    }

    async function deleteLink(id) {
        try {
            await service.deleteLink(id)
            setLinks(links.filter(link => link.id !== id))
        } catch (error) {
            console.error('Error deleting link:', error)
        }
    }

    function logout() {
        session.logout()
    }

    return {
        links,
        fetchLinks,
        createLink,
        deleteLink,
        logout
    }
}