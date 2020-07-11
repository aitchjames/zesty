import axios from "axios";
import { showAlert } from "./alerts";

export const search = async (searchTerm) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/recipes/search/${searchTerm}`
        });

        if ((res.data.status = 'success')) {
            location.assign(`/search/${searchTerm}`);
        }
    } catch (err) {
        showAlert('error', 'Error searching, please try again');
    }
};