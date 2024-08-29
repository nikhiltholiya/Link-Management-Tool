import { SVGProps } from "react-html-props";
import Discord from "./Discord";
import Dribbble from "./Dribbble";
import Email from "./Email2";
import Facebook from "./Facebook";
import Github from "./Github";
import Google from "./Google";
import Image from "./Image2";
import Instagram from "./Instagram";
import Linkedin from "./Linkedin";
import Messenger from "./Messenger";
import Pinterest from "./Pinterest";
import SnapChat from "./Snapchat";
import SoundCloud from "./SoundCloud";
import Spotify from "./Spotify";
import Telegram from "./Telegram";
import Telephone from "./Telephone";
import TikTok from "./TikTok";
import Twitter from "./Twitter";
import Vimeo from "./Vimeo";
import Whatsapp from "./Whatsapp2";
import YouTube from "./YouTube";
import Link from "./Link2";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import BioLink from "./Link";
import Setting from "./Setting";
import Chat from "./Chat";
import ShortLink from "./ShortLink";
import Dashboard from "./Dashboard";
import Palette from "./Palette";
import Pricing from "./Pricing";
import Calendar from "./Calendar";
import PaymentSettings from "./PaymentSettings";
import IdCard from "./IdCard";
import Projects from "./Projects";
import LogOut from "./LogOut";
import Users from "./Users";
import QRcode from "./QRcode";
import Page from "./Page";
import Control from "./Control";

interface IconMap {
   [key: string]: (props: SVGProps) => JSX.Element;
}

const icons: IconMap = {
   Discord,
   Dribbble,
   Email,
   Facebook,
   Github,
   Google,
   Image,
   Instagram,
   Linkedin,
   Messenger,
   Pinterest,
   SnapChat,
   SoundCloud,
   Spotify,
   Telephone,
   Telegram,
   TikTok,
   Twitter,
   Vimeo,
   Whatsapp,
   YouTube,
   Link,
   Heading,
   Paragraph,
   BioLink,
   Setting,
   Chat,
   ShortLink,
   Dashboard,
   Palette,
   Pricing,
   Calendar,
   PaymentSettings,
   IdCard,
   Projects,
   LogOut,
   Users,
   QRcode,
   Page,
   Control,
};

export default icons;
