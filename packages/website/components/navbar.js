import Router, { useRouter } from 'next/router'
import { useCallback, useMemo, useRef, useState } from 'react'

import Button from './button.js'
import Cross from '../icons/cross'
import Hamburger from '../icons/hamburger'
import Link from 'next/link'
import clsx from 'clsx'
import countly from '../lib/countly'
import { getMagic } from '../lib/magic.js'
import { useQueryClient } from 'react-query'

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
  const [isMenuOpen, setMenuOpen] = useState(false)
  const { query } = useRouter()
  const version = /** @type {string} */ (query.version)

  const logout = useCallback(async () => {
    await getMagic().user.logout()
    await queryClient.invalidateQueries('magic-user')
    Router.push({ pathname: '/', query: version ? { version } : null })
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
          pathname: '/',
          hash: '#docs',
          query: version ? { version } : null,
        },
        name: 'Docs',
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
    <nav className={clsx(bgColor, 'w-100 z-50 navbar')} ref={containerRef}>
      <div className="flex items-center justify-between ph3 ph5-ns pv3 center mw9">
        <div className="hamburger flex align-middle">
          <Button onClick={toggleMenu} small className="flex-column">
            <Hamburger className="w1 m2" aria-label="Toggle Navbar" />
          </Button>
        </div>
        <Link href={{ pathname: '/', query: version ? { version } : null }}>
          <a className="no-underline v-mid" onClick={onLinkClick}>
            <img
              src={logo.src}
              width="160"
              height="79"
              className="nav-logo"
              style={{ maxWidth: '80px', height: 'auto' }}
              alt="NFT Storage Logo"
            />
          </a>
        </Link>
        <div className="flex items-center">
          <div className="desktop-nav-items mr4">
            {ITEMS.map((item, index) =>
              item.mobileOnly ? null : (
                <div
                  className="select-none"
                  key={`nav-link-${index}`}
                  onClick={item.onClick}
                >
                  <Link href={item.link || ''}>
                    <a
                      key={item.name}
                      className={clsx(
                        'f4 black no-underline underline-hover v-mid',
                        { mr4: index === ITEMS.length - 1 }
                      )}
                      onClick={item.tracking ? item.tracking : onLinkClick}
                    >
                      {item.name}
                    </a>
                  </Link>
                  {index !== ITEMS.length - 2 && (
                    <span className="mh2 v-mid b black">•</span>
                  )}
                </div>
              )
            )}
          </div>
          <div className="mb1">
            {user ? (
              <Button
                onClick={logout}
                id="logout"
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
          'mobile-nav transition-all duration-300 fixed top-0 left-0 bottom-0 shadow-4 p6 w-100',
          isMenuOpen ? 'flex opacity-100' : 'o-0 invisible'
        )}
        style={{ zIndex: 100 }}
        aria-hidden={isMenuOpen}
      >
        <div className="flex flex-column items-center text-center mt4">
          <Link href="/">
            <a className="no-underline v-mid">
              <img
                src={logo.src}
                width="160"
                height="79"
                className="mobile-nav-logo"
                style={{ maxWidth: '80px', height: 'auto' }}
                alt="NFT Storage Logo"
              />
            </a>
          </Link>
        </div>
        <div className="mobile-nav-items flex flex-column items-center justify-center text-center pv4 flex-auto">
          {ITEMS.map((item, index) => (
            <div
              className="mobile-nav-item"
              key={`menu-nav-link-${index}`}
              onClick={item.onClick}
            >
              <Link href={item.link || ''}>
                <a
                  className={clsx(
                    'mobile-nav-link v-mid chicagoflf',
                    logo.isDark ? 'black' : 'white'
                  )}
                  onClick={item.tracking ? item.tracking : onMobileLinkClick}
                >
                  {item.name}
                </a>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex flex-column items-center mb4">
          <Button className="flex justify-center" onClick={toggleMenu}>
            <Cross width="24" height="24" fill="currentColor" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
