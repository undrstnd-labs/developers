import Image from "next/image"
import {
  AlbumIcon,
  AlertTriangle,
  AlignJustifyIcon,
  ArrowRight,
  BellIcon,
  BookImageIcon,
  BookOpenText,
  Building2Icon,
  CalendarClockIcon,
  CarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  CircleCheck,
  CircleIcon,
  ClockIcon,
  CloudIcon,
  CodeXmlIcon,
  ConciergeBell,
  CopyIcon,
  CreditCard,
  DatabaseZapIcon,
  ExternalLinkIcon,
  File,
  FileText,
  FlagIcon,
  FolderPlus,
  GlobeIcon,
  HandshakeIcon,
  HeartIcon,
  HelpCircle,
  Image as ImageIcon,
  Laptop,
  LeafIcon,
  LineChartIcon,
  Loader2,
  LockIcon,
  LucideIcon,
  MailIcon,
  MapIcon,
  MessageCircleQuestionIcon,
  Monitor,
  Moon,
  MoreVertical,
  PanelsTopLeft,
  PartyPopperIcon,
  PencilIcon,
  PhoneIcon,
  Pizza,
  Plus,
  PuzzleIcon,
  ScrollIcon,
  Search,
  SendHorizonalIcon,
  Settings,
  ShieldIcon,
  ShoppingCartIcon,
  StarIcon,
  SunMedium,
  TagIcon,
  TicketIcon,
  ToggleRightIcon,
  Trash,
  TruckIcon,
  Unlink,
  UserCogIcon,
  UserIcon,
  X,
  ZapIcon,
} from "lucide-react"
import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaInstagram,
  FaTiktok,
  FaUmbrellaBeach,
} from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { LiaUserTieSolid } from "react-icons/lia"
import {
  MdFamilyRestroom,
  MdOutlineDescription,
  MdOutlineIntegrationInstructions,
  MdOutlineMemory,
} from "react-icons/md"
import { SiPrisma } from "react-icons/si"

export type Icon = LucideIcon

function LogoIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/favicons/android-chrome-192x192.png"
      alt="logo"
      className={className}
      width={32}
      height={32}
    />
  )
}

function DistilWhishper({ className }: { className?: string }) {
  return (
    <Image
      src="https://cdn-avatars.huggingface.co/v1/production/uploads/61f91cf54a8e5a275b2b3e7c/cUNzV7MAYi8lo9LsCYixp.png"
      alt="logo"
      className={className}
      width={32}
      height={32}
    />
  )
}

function Groq({ className }: { className?: string }) {
  return (
    <Image
      src="https://cdn-avatars.huggingface.co/v1/production/uploads/1673913216963-63115d7864939fabc00f0b45.png"
      alt="logo"
      className={className}
      width={32}
      height={32}
    />
  )
}

function Meta({ className }: { className?: string }) {
  return (
    <Image
      src="https://cdn-avatars.huggingface.co/v1/production/uploads/646cf8084eefb026fb8fd8bc/oCTqufkdTkjyGodsx1vo1.png"
      alt="logo"
      className={className}
      width={32}
      height={32}
    />
  )
}

function Mistral({ className }: { className?: string }) {
  return (
    <Image
      src="https://cdn-avatars.huggingface.co/v1/production/uploads/62dac1c7a8ead43d20e3e17a/wrLf5yaGC6ng4XME70w6Z.png"
      alt="logo"
      className={className}
      width={32}
      height={32}
    />
  )
}

function OpenAi({ className }: { className?: string }) {
  return (
    <Image
      src="https://cdn-avatars.huggingface.co/v1/production/uploads/1620805164087-5ec0135ded25d76864d553f1.png"
      alt="logo"
      className={className}
      width={32}
      height={32}
    />
  )
}

export const Icons = {
  logo: LogoIcon,
  logoLucide: LogoIcon,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: ImageIcon,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: UserIcon,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  search: Search,
  twitter: FaXTwitter,
  check: Check,
  orderbook: BookOpenText,
  chevronsUpDown: ChevronsUpDown,
  phone: PhoneIcon,
  mail: MailIcon,
  pencil: PencilIcon,
  student: PencilIcon,
  teacher: UserCogIcon,
  monitor: Monitor,
  discord: FaDiscord,
  github: FaGithub,
  memory: MdOutlineMemory,
  integrationInstructions: MdOutlineIntegrationInstructions,
  description: MdOutlineDescription,
  bell: BellIcon,
  heart: HeartIcon,
  cart: ShoppingCartIcon,
  shield: ShieldIcon,
  folderPlus: FolderPlus,
  copy: CopyIcon,
  external: ExternalLinkIcon,
  unlink: Unlink,
  clock: ClockIcon,
  tag: TagIcon,
  flag: FlagIcon,
  star: StarIcon,
  circleCheck: CircleCheck,
  lock: LockIcon,
  graph: LineChartIcon,
  puzzle: PuzzleIcon,
  databaseZap: DatabaseZapIcon,
  prisma: SiPrisma,
  globe: GlobeIcon,
  blog: BookImageIcon,
  zap: ZapIcon,
  toggleRight: ToggleRightIcon,
  facebook: FaFacebook,
  google: FaGoogle,
  circle: CircleIcon,
  tiktok: FaTiktok,
  instagram: FaInstagram,
  menu: AlignJustifyIcon,
  car: CarIcon,
  driver: LiaUserTieSolid,
  calendarClock: CalendarClockIcon,
  truck: TruckIcon,
  entreprise: Building2Icon,
  map: MapIcon,
  ticket: TicketIcon,
  family: MdFamilyRestroom,
  bellhop: ConciergeBell,
  dashboard: PanelsTopLeft,
  beach: FaUmbrellaBeach,
  party: PartyPopperIcon,
  leaf: LeafIcon,
  handshake: HandshakeIcon,
  questionCircle: MessageCircleQuestionIcon,
  scroll: ScrollIcon,
  album: AlbumIcon,
  send: SendHorizonalIcon,
  distilWhisper: DistilWhishper,
  groq: Groq,
  meta: Meta,
  mistral: Mistral,
  openAi: OpenAi,
  cloud: CloudIcon,
  code: CodeXmlIcon
}
