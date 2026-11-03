import requestProvider from '../providers/requestProvider';
import APIRoutes from '../enums/apiRoutes';

export default function linkService() {

    async function fetchLinks() {
        const response = await requestProvider.get(APIRoutes.LINKS);
        return response.data;
    }

    async function createLink(newLink) {
        const response = await requestProvider.post(APIRoutes.LINKS, newLink)
        return response.data;
    }

    async function deleteLink(id) {
        await requestProvider.delete(`${APIRoutes.LINKS}/${id}`)
    }

    return {
        fetchLinks,
        createLink,
        deleteLink
    }
}
