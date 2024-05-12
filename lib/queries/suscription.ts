import api, { converToStringfy } from "../api";
import { Stripe } from "./interfaces/stripe";
import { GetSuscriptionsResponse, PostSuscriptionParams } from "./interfaces/suscription.interface";

export const getAllSuscriptions = async () => {
    try {
        const { data } = await api.get<GetSuscriptionsResponse>('/suscription');
        return data;
    } catch (error) {
        throw error;
    }
}

export const postCreateSuscription = async (token: string, suscription: PostSuscriptionParams) => {
    try {
        const obj: PostSuscriptionParams = {
            suscriptionId: suscription.suscriptionId,
            hosting: suscription.hosting
        }
        return await api.post<Stripe>('/suscription', converToStringfy(obj), {
            headers: {
                "auth-token": token
            }
        });
    } catch (error) {
        throw error;
    }
}