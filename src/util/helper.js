import { deleteClient } from "../store/thunk/client.thunk";
import { deleteContractor } from "../store/thunk/contractor.thunk";
export const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

export const getDeleteDispatch = (id, dispatch, compTitle) => {
    if (compTitle === 'Clients') {
        dispatch(deleteClient({ id }))
    } else if (compTitle === 'Contractors') {
        dispatch(deleteContractor({ id }))
    }
}
