import 'express-session';
import { Session, SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: { id: number; username: string };
  }
}

declare module 'express' {
  interface Request {
    session: Session & Partial<SessionData>; // 세션과 세션 데이터 결합
  }
}