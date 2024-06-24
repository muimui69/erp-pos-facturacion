import api, { converToStringfy } from "../api";
import { GetInvitationByID, GetInvitationsResponse, GetUserInvitationResponse, PatchInvitationParams, PostInvitationParams } from "./interfaces/invitation.interface";

export const getAllInvitations = async (serviceToken: string, subdomain: string) => {
    try {
        return await api.get<GetInvitationsResponse>('/invitation', {
            headers: {
                subdomain,
                "service-token": serviceToken
            },
        });
    } catch (error) {
        throw error;
    }
}


export const getUserInvitation = async (serviceToken: string, subdomain: string, search: string) => {
    try {
        const { data } = await api.get<GetUserInvitationResponse>('/invitation/search-user', {
            headers: {
                subdomain,
                "service-token": serviceToken
            },
            params: {
                search
            }
        })
        return data;
    } catch (error) {
        throw error;
    }
}


export const postCreateInvitation = async (serviceToken: string, subdomain: string, invitation: PostInvitationParams) => {
    try {
        const obj: PostInvitationParams = {
            rolId: invitation.rolId,
            users: invitation.users
        }
        return await api.post('/invitation', converToStringfy(obj), {
            headers: {
                subdomain,
                "service-token": serviceToken
            }
        });
    } catch (error) {
        throw error;
    }
}


export const deleteInvitationById = async (serviceToken: string, subdomain: string, id: string) => {
    try {
        const { data } = await api.delete(`/invitation/cancel/${id}`, {
            headers: {
                subdomain,
                "service-token": serviceToken
            }
        })
        return data;
    } catch (error) {
        throw error;
    }
}


// ! ojo
export const patchAcceptInvitationById = async (token: string, subdomain: string, id: string, invitation: PatchInvitationParams) => {
    try {
        const obj:PatchInvitationParams = {
            rolId: invitation.rolId,
            userId: invitation.userId
        }
        const { data } = await api.patch(`/invitation/accept/${id}`, converToStringfy(obj), {
            headers: {
                subdomain,
                "auth-token": token
            }
        })
        return data;
    } catch (error) {
        throw error;
    }
}


export const getInvitationById = async (token: string, id: string) => { 
    try {
        const { data } = await api.get<GetInvitationByID>(`/invitation/${id}`, {
            headers: {
                "auth-token": token
            }
        })
        return data;
    } catch (error) {
        throw error;
    }
}



export const patchResendInvitationById = async (serviceToken: string, subdomain: string, id: string) => {
    try {
        const { data } = await api.patch(`/invitation/resend/${id}`, {
            headers: {
                subdomain,
                "service-token": serviceToken
            }
        })
        return data;
    } catch (error) {
        throw error;
    }
}

