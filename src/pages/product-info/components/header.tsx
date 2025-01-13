import { CartSheet } from './cart-sheet'

export function Header() {
  return (
    <header>
      <div className="grid grid-cols-2 md:grid-cols-3 border-black">
        <div className="flex items-center border-r border-black">
          <div className="flex items-center px-4 md:px-8 py-4 space-x-4 md:space-x-8">
            <a href="/shop" className="text-sm hover:text-gray-600">Shop</a>
            <a href="/contact" className="text-sm hover:text-gray-600">Contact</a>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center border-r border-black">
          {/* Center section - can be used for logo or left empty */}
        </div>
        <div className="flex items-center justify-end px-4 md:px-8 py-4 space-x-4 md:space-x-8">
          <a href="/sign-in" className="text-sm hover:text-gray-600">Sign in</a>
          <CartSheet />
        </div>
      </div>
    </header>
  )
}

