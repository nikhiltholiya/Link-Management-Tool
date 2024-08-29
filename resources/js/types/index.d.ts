import { InputProps as InputPropsHTML } from "react-html-props";
import { AppTranslations, InputTranslations } from "./translation";

interface TableCommon {
   id: number;
   created_at: string;
   updated_at: string;
}

export interface App extends TableCommon {
   logo: string;
   title: string;
   copyright: string;
   description: string;
}

export interface UserProps extends TableCommon {
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
   roles: any[];
}

type Common = Record<string, unknown>;

export type PageProps<T extends Common = Common> = T & {
   app: App;
   auth: {
      user: UserProps;
   };
   flash: {
      error: string;
      warning: string;
      success: string;
   };
   errors: {};
   ziggy: {
      defaults: any[];
      location: string;
      port: number;
      routes: {};
      url: string;
   };
   translate: {
      langs: string[];
      locale: string;
      app: AppTranslations;
      input: InputTranslations;
   };
   next_payment?: boolean;
};

export interface SelectListProps {
   key: string | number;
   value: string | number;
}

export interface SelectInputProps {
   name: string;
   label?: string;
   error?: string;
   required?: boolean;
   className?: string;
   flexLabel?: boolean;
   fullWidth?: boolean;
   onChange: (param: SelectListProps) => void;
   defaultValue: string | number | null;
   itemList: SelectListProps[];
   dropdownListClass?: string;
}

export interface TextAreaProps {
   rows: number;
   cols: number;
   name: string;
   value?: string;
   label?: string;
   error?: string;
   maxLength?: number;
   onChange?: (e: any) => void;
   className?: string;
   fullWidth?: boolean;
   placeholder?: string;
   flexLabel?: boolean;
   required?: boolean;
}

export interface InputProps extends InputPropsHTML {
   type: string;
   name: string;
   value?: string;
   label?: string;
   error?: string | null;
   maxLength?: number;
   fullWidth?: boolean;
   onChange?: (e: any) => void;
   className?: string;
   placeholder?: string;
   required?: boolean;
   flexLabel?: boolean;
   disabled?: boolean;
   readOnly?: boolean;
}

export interface PaginationProps {
   current_page: number;
   data: any[];
   first_page_url: string;
   from: any;
   last_page: number;
   last_page_url: string;
   links: any[];
   next_page_url: any;
   path: string;
   per_page: number;
   prev_page_url: any;
   to: any;
   total: number;
}

export interface ThemeProps extends TableCommon {
   name: string;
   type: string;
   background: string;
   bg_image: string | null;
   button_style: string;
   font_family: string;
   text_color: string;
   theme_demo: string;
}

export interface CustomThemeProps extends TableCommon {
   name: string;
   link_id: number;
   bg_color: string;
   background: string;
   background_type: string;
   bg_image: string | null;
   btn_bg_color: string;
   btn_radius: string;
   btn_text_color: string;
   btn_transparent: 0;
   btn_type: string;
   font_family: string;
   text_color: string;
}

export interface LinkItemProps extends TableCommon {
   content: string | null;
   item_icon: string;
   item_link: string | null;
   item_position: number;
   item_sub_type: string | null;
   item_title: string;
   item_type: string;
   link_id: number;
}

export interface LinkProps extends TableCommon {
   socials: any;
   social_color?: any;
   theme: ThemeProps;
   items: LinkItemProps[];
   branding: string | null;
   link_name: string;
   link_type: string;
   qrcode_id: number | null;
   short_bio: string | null;
   custom_theme_active: number | boolean;
   custom_theme_id: number | null;
   custom_theme: CustomThemeProps | null;
   external_url: string | null;
   theme_id: number;
   thumbnail: string | null;
   url_name: string;
   user_id: number;
}

export interface SocialLinkProps {
   name: string;
   icon: string;
   linkType: string;
   placeholder: string;
}

export interface SocialProps {
   email: string;
   telephone: string;
   telegram: string;
   whatsapp: string;
   facebook: string;
   messenger: string;
   instagram: string;
   twitter: string;
   tiktok: string;
   youtube: string;
   soundcloud: string;
   linkedin: string;
   spotify: string;
   pinterest: string;
   snapchat: string;
   discord: string;
}

export interface ProjectProps extends TableCommon {
   user_id: number;
   project_name: string;
   qrcodes: QRCodeProps[];
}

export interface PlanProps extends TableCommon {
   biolinks: string;
   currency: string;
   description: string;
   monthly_price: number;
   name: string;
   projects: string;
   qrcodes: string;
   shortlinks: string;
   status: string;
   support: number;
   themes: string;
   biolink_blocks: number;
   custom_theme: number | boolean;
   yearly_price: number;
}

export interface TestimonialProps extends TableCommon {
   name: string;
   title: string;
   thumbnail: string;
   testimonial: string;
}

export interface PaymentProps extends TableCommon {
   active: boolean;
   key: string;
   secret?: string;
}

export interface SocialLoginProps extends TableCommon {
   active: boolean;
   name: string;
   client_id: string;
   client_secret: string;
   redirect_url: string;
}

export interface AppSettingProps extends TableCommon {
   title: string;
   logo: string;
   description: string;
   copyright: string;
}

export interface SMTPProps extends TableCommon {
   host: string;
   port: number;
   username: string;
   password: string;
   sender_email: string;
   sender_name: string;
   encryption: string;
}

export interface CustomPageProps extends TableCommon {
   name: string;
   route: string;
   content: string;
}

export interface QRCodeProps extends TableCommon {
   content: string;
   qr_type: string;
   user_id: number;
   img_data: string;
   link_id: null | number;
   project_id: null | number;
}
