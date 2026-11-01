import { useState } from 'react';
import linkService from '../../services/linkService';
import { useSession } from '../../contexts/SessionContext'

export default function linkViewModel() {
    const service = linkService();
    const session = useSession();

    const [links, setLinks] = useState([])

    let [selectedLinkIdToDelete, setSelectedLinkToDelete] = useState(null)
    var [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

    function openDeleteModal(linkId) {
        setSelectedLinkToDelete(linkId)
        setIsOpenDeleteModal(true)
    }

    function closeDeleteModal() {
        setSelectedLinkToDelete(null)
        setIsOpenDeleteModal(false)
    }

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

    async function deleteLink() {
        closeDeleteModal()

        try {
            await service.deleteLink(selectedLinkIdToDelete)
            setLinks(links.filter(link => link.id !== selectedLinkIdToDelete))
        } catch (error) {
            console.error('Error deleting link:', error)
        }
    }

    return {
        links,
        isOpenDeleteModal,
        openDeleteModal,
        closeDeleteModal,
        fetchLinks,
        createLink,
        deleteLink
    }
}