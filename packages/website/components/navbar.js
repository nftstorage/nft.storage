import Router, { useRouter } from 'next/router'
import { useCallback, useMemo, useRef, useState } from 'react'

import Button from './button.js'
import Cross from '../icons/cross'
import Hamburger from '../icons/hamburger'
import Link from './link'
import clsx from 'clsx'
import countly from '../lib/countly'
import { getMagic } from '../lib/magic.js'
import { useQueryClient } from 'react-query'
import Logo from '../components/logo'
import { useUser } from 'lib/user.js'

/**
 * Navbar Component
 *
 * @param {Object} props
 * @param {string} [props.bgColor]
 * @param {{ src: string, isDark: boolean}} props.logo
 * @param {any} [props.user]
 */

export default function Navbar({ bgColor = 'bg-nsorange', logo, user }) {
  const containerRef = useRef(null)
  const queryClient = useQueryClient()
  const { handleClearUser } = useUser()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const { query } = useRouter()
  const version = /** @type {string} */ (query.version)

  const logout = useCallback(async () => {
    await getMagic().user.logout()
    delete sessionStorage.hasSeenUserBlockedModal
    handleClearUser()
    Router.push({ pathname: '/', query: version ? { version } : null })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryClient, version])

  const trackLogout = useCallback(() => {
    countly.trackEvent(countly.events.LOGOUT_CLICK, {
      ui: countly.ui.NAVBAR,
      action: 'Logout',
    })
  }, [])

  const ITEMS = useMemo(
    () => [
      ...(user
        ? [
            {
              link: {
                pathname: '/files',
                query: version ? { version } : null,
              },
              name: 'Files',
            },
            {
              link: {
                pathname: '/manage',
                query: version ? { version } : null,
              },
              name: 'API Keys',
            },
          ]
        : []),
      {
        link: {
          pathname: '/',
          hash: '#about',
          query: version ? { version } : null,
        },
        name: 'About',
      },
      {
        link: {
          pathname: '/docs',
          query: version ? { version } : null,
        },
        name: 'Docs',
      },
      {
        link: {
          pathname: '/stats',
          query: version ? { version } : null,
        },
        name: 'Stats',
      },
      {
        link: {
          pathname: '/faq',
          query: version ? { version } : null,
        },
        name: 'FAQ',
      },
      {
        link: {
          pathname: '/blog',
          query: version ? { version } : null,
        },
        name: 'Blog',
      },
      ...(user
        ? [
            {
              onClick: logout,
              name: 'Logout',
              tracking: trackLogout,
              mobileOnly: true,
            },
          ]
        : [
            {
              link: {
                pathname: '/login',
                query: version ? { version } : null,
              },
              name: 'Login',
              mobileOnly: true,
            },
          ]),
    ],
    [user, version, logout, trackLogout]
  )

  const onLinkClick = useCallback((event) => {
    countly.trackCustomLinkClick(
      countly.events.LINK_CLICK_NAVBAR,
      event.currentTarget
    )
  }, [])

  const toggleMenu = useCallback(() => {
    isMenuOpen
      ? document.body.classList.remove('overflow-hidden')
      : document.body.classList.add('overflow-hidden')
    setMenuOpen(!isMenuOpen)
  }, [isMenuOpen])

  const onMobileLinkClick = useCallback(
    (event) => {
      onLinkClick(event)
      toggleMenu()
    },
    [onLinkClick, toggleMenu]
  )

  return (
    <nav className={clsx(bgColor, 'w-full z-50 navbar')} ref={containerRef}>
      <div className="flex items-center justify-between px-6 sm:px-16 py-4 mx-auto max-w-7xl">
        <div className="hamburger flex align-middle">
          <Button onClick={toggleMenu} small className="flex-col">
            <Hamburger className="w-4 m2" aria-label="Toggle Navbar" />
          </Button>
        </div>
        <Link
          className="nav-logo-link flex no-underline align-middle"
          href={{ pathname: '/', query: version ? { version } : null }}
          onClick={onLinkClick}
        >
          <Logo dark={logo.isDark} />
        </Link>
        <div className="flex items-center">
          <div className="desktop-nav-items">
            {ITEMS.map((item, index) =>
              item.mobileOnly ? null : (
                <div
                  className="select-none"
                  key={`nav-link-${index}`}
                  onClick={item.onClick}
                >
                  <Link
                    href={item.link || ''}
                    key={item.name}
                    className={clsx(
                      'text-xl text-black no-underline underline-hover align-middle',
                      { mr4: index === ITEMS.length - 1 }
                    )}
                    onClick={item.tracking ? item.tracking : onLinkClick}
                  >
                    {item.name}
                  </Link>
                  {index !== ITEMS.length - 2 && (
                    <span className="mx-2 align-middle font-bold text-black">
                      •
                    </span>
                  )}
                </div>
              )
            )}
            {user ? (
              <Button
                onClick={logout}
                id="logout"
                className="ml-8"
                tracking={{
                  event: countly.events.LOGOUT_CLICK,
                  ui: countly.ui.NAVBAR,
                  action: 'Logout',
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                className="ml-8"
                href={{
                  pathname: '/login',
                  query: version ? { version } : null,
                }}
                id="login"
                tracking={{
                  ui: countly.ui.NAVBAR,
                  action: 'Login',
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          bgColor,
          'flex mobile-nav transition-all fixed top-0 left-0 bottom-0 w-full z-50',
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden={isMenuOpen}
      >
        <div className="flex flex-col items-center text-center mt-8">
          <Link
            href="/"
            className="mobile-nav-menu-logo flex no-underline align-middle"
          >
            <Logo dark={logo.isDark} />
          </Link>
        </div>
        <div className="mobile-nav-items text-center flex flex-col items-center justify-center flex-auto overflow-y-scroll">
          <div className="max-h-full">
            {ITEMS.map((item, index) => (
              <div
                className="mobile-nav-item"
                key={`menu-nav-link-${index}`}
                onClick={item.onClick}
              >
                <Link
                  href={item.link || ''}
                  className={clsx(
                    'mobile-nav-link align-middle chicagoflf',
                    logo.isDark ? 'black' : 'white'
                  )}
                  onClick={item.tracking ? item.tracking : onMobileLinkClick}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center mb-8">
          <Button className="flex justify-center" onClick={toggleMenu}>
            <Cross width="24" height="24" fill="currentColor" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
