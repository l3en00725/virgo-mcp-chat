'use client';

import Image from 'next/image';
import Link from 'next/link';

export function SignedOutHeader() {
  return (
    <header className="flex items-center w-full px-4 py-3 bg-background gap-4 sticky top-0 z-10 border-b">
      <Link href="/" className="flex items-center">
        <Image
          src="/images/Logo-01.png"
          alt="Virgo Logo"
          width={108}
          height={32}
          priority
        />
      </Link>
    </header>
  );
}


  return (
    <header className="flex items-center w-full px-4 py-3 bg-background gap-4 sticky top-0 z-10 border-b">
      <Link href="/" className="flex items-center">
        <Image
          src="/images/pipedream.svg"
          alt="Pipedream"
          width={108}
          height={24}
          priority
          className="dark:invert"
        />
      </Link>
      
      <div className="flex items-center gap-3 ml-auto">
        <GitHubButton className="hidden md:flex" style="secondary" />
        <DocsButton className="hidden md:flex" style="secondary" />
        <Button onClick={handleGetStarted} variant="blue">
          Get started
        </Button>
      </div>

      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)} 
      />
    </header>
  );
}
