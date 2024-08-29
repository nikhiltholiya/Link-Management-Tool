import type { PageProps } from "@inertiajs/core";

export interface PageType extends PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            email_verified_at: string;
            password: string;
            status: string;
            phone: string;
            image: string;
            google_id: string;
            pricing_plan_id: number;
            subscription_id: number;
            next_payment: string;
            recurring: string;
        };
    };
    flash: {
        error: string;
        warning: string;
        success: string;
    };
}
