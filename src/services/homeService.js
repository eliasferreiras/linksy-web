import { useState } from 'react'
import requestProvider from '../providers/requestProvider'

export default function homeService() {
    const [links, setLinks] = useState([])

    async function fetchLinks() {
        try {
            const response = await requestProvider.get('/links')
            setLinks(response.data)
        } catch (error) {
            console.error('Error fetching links:', error)
        }
    }

    async function createLink(newLink) {
        try {
            const response = await requestProvider.post('/links', newLink)
            setLinks([...links, response.data])
        } catch (error) {
            console.error('Error creating link:', error)
        }
    }

    async function deleteLink(id) {
        try {
            await requestProvider.delete(`/links/${id}`)
            setLinks(links.filter(link => link.id !== id))
        } catch (error) {
            console.error('Error deleting link:', error)
        }
    }

    return {
        links,
        fetchLinks,
        createLink,
        deleteLink
    }
}
