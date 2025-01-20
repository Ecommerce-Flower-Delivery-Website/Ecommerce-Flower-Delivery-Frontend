import Link from 'next/link';

export function LoginPrompt() {
  return (
    <div className="bg-[#E9E9E9] p-4 mb-8">
      <p className="text-sm">
        Already have an account?{' '}
        <Link href="/login" className="underline">
          Log in
        </Link>{' '}
        for faster checkout
      </p>
    </div>
  );
}

