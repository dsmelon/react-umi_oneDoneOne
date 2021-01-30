declare module '*.css';
declare module '*.less';
declare module "*.png";
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string
  export default url
}
interface Window {
  token: string | null;
  getToken: () => string | Promise<string>;
  _jump: (option?:string|{url:string,query:any}|number, type?:"replace"|"push"|undefined|"back"|"go") => void;
  loginAct: () => void;
  exit: () => void;
}