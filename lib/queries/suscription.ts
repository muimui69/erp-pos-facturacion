import api, { converToStringfy } from "../api";
import { Suscription } from "./interfaces/suscription.interface";

export const getAllSuscriptions = async () => {
    try {
        const { data } = await api.get<Suscription>('/suscription')
        return data;
    } catch (error) {
        throw error;
    }
}
