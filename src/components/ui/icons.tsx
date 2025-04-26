
import { LucideProps } from "lucide-react";
import { Eye, EyeOff, User, LogIn, Mail } from "lucide-react";

export const Icons = {
  google: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 22q-2.05 0-3.875-.788t-3.188-2.15-2.137-3.175T2 12q0-2.075.788-3.887t2.15-3.175Q6.3 3.575 8.124 2.787T12 2q2.05 0 3.887.8t3.175 2.137q1.338 1.338 2.137 3.163T22 12q0 2.05-.8 3.875t-2.137 3.175q-1.338 1.338-3.163 2.137T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm-4-8q0 1.65 1.175 2.825T12 16q1.65 0 2.825-1.175T16 12q0-1.65-1.175-2.825T12 8q-1.65 0-2.825 1.175T8 12Z"
      />
    </svg>
  ),
  eye: Eye,
  eyeOff: EyeOff,
  user: User,
  logIn: LogIn,
  mail: Mail
} as const;
