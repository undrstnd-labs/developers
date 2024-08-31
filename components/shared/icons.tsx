import Image from "next/image"
import {
  AlertTriangle,
  ArrowRight,
  BookImageIcon,
  BookOpenText,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsRightIcon,
  ChevronsUpDown,
  CopyIcon,
  CreditCard,
  DatabaseZapIcon,
  File,
  FileText,
  GlobeIcon,
  HelpCircle,
  Image as ImageIcon,
  Laptop,
  LineChartIcon,
  Loader2,
  LockIcon,
  LucideIcon,
  MailIcon,
  Monitor,
  Moon,
  MoreVertical,
  PencilIcon,
  PhoneIcon,
  Pizza,
  Plus,
  PuzzleIcon,
  Search,
  Settings,
  SunMedium,
  ToggleRightIcon,
  Trash,
  UserCircleIcon,
  UserCogIcon,
  X,
  ZapIcon,
} from "lucide-react"
import { FaDiscord, FaGithub } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import {
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

export const Icons = {
  logo: LogoIcon,
  logoLucide: ChevronsRightIcon,
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
  user: UserCircleIcon,
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
  lock: LockIcon,
  puzzle: PuzzleIcon,
  globe: GlobeIcon,
  databaseZap: DatabaseZapIcon,
  blog: BookImageIcon,
  graph: LineChartIcon,
  prisma: SiPrisma,
  zap: ZapIcon,
  copy: CopyIcon,
  toggleRight: ToggleRightIcon,
}
