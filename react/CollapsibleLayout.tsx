/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import './styles.css'

const CSS_HANDLES = [
  'wrapper',
  'gradient',
  'content',
  'content--opened',
  'content--closed',
  'container',
  'container--opened',
  'container--closed',
  'showMore',
  'showMore--opened',
  'showMore--closed',
] as const

type Props = {
  initiallyOpen: boolean
  showMoreText: string
  showLessText: string
  minHeight: number
  showGradient: boolean
}

const CollapsibleLayout: StorefrontFunctionComponent<Props> = ({
  initiallyOpen = false,
  minHeight,
  showMoreText = 'Show More',
  showLessText = 'Show Less',
  showGradient = true,
  children,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [isDesktop, setDesktop] = useState(false)
  const [open, setOpen] = useState(initiallyOpen)
  const [showMoreButton, setShowMoreButton] = useState(false)
  const contentRef: any | null = useRef(null)
  const containerRef: any | null = useRef(null)
  const styles = {
    initialVisibility: () => {
      if (initiallyOpen) {
        return { minHeight }
      }

      return { minHeight, maxHeight: minHeight }
    },
  }

  const scroll = () => {
    const section = document.querySelector('#content')

    if (section !== null) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleClick = (e: any) => {
    e.preventDefault()
    if (open) {
      setOpen(false)
      scroll()
    } else {
      setOpen(true)
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (window.innerWidth > 1025) {
      setDesktop(true)
    } else {
      setDesktop(false)
    }

    const updateMedia = () => {
      if (window.innerWidth > 1025) {
        setDesktop(true)
      } else {
        setDesktop(false)
      }
    }

    window.addEventListener('resize', updateMedia)

    return () => window.removeEventListener('resize', updateMedia)
  }, [])

  useEffect(() => {
    if (contentRef !== null && containerRef !== null) {
      if (
        containerRef.current?.clientHeight >
        Number(minHeight.toString().replace(/\D/gm, ''))
      ) {
        setShowMoreButton(true)
      }

      if (open) {
        contentRef.current.style.maxHeight = containerRef.current?.clientHeight
          .toString()
          .concat('px')
      } else {
        contentRef.current.style.maxHeight = minHeight.toString().concat('px')
      }
    }
  }, [open, isDesktop, minHeight])

  return (
    <div className={`${handles.wrapper}`}>
      <div
        id="content"
        ref={contentRef}
        className={`${handles.content} ${
          open ? handles['content--opened'] : handles['content--closed']
        }`}
        style={styles.initialVisibility()}
      >
        <div ref={containerRef} className={`${handles.container}`}>
          {children}
        </div>
      </div>

      {showMoreButton ? (
        showGradient ? (
          <>
            {!open ? <div className={handles.gradient} /> : <></>}
            <button
              className={`${handles.showMore} ${
                open ? handles['showMore--opened'] : handles['showMore--closed']
              }`}
              onClick={handleClick}
            >
              {open ? showLessText : showMoreText}
            </button>
          </>
        ) : (
          <button
            className={`${handles.showMore} ${
              open ? handles['showMore--opened'] : handles['showMore--closed']
            }`}
            onClick={() => (open ? setOpen(false) : setOpen(true))}
          >
            {open ? showLessText : showMoreText}
          </button>
        )
      ) : (
        <></>
      )}
    </div>
  )
}

CollapsibleLayout.schema = {
  title: 'admin/editor.collapsible-layout.title',
  description: 'admin/editor.collapsible-layout.description',
  type: 'object',
  properties: {
    initiallyOpen: {
      title: 'admin/editor.collapsible-layout.initiallyOpen.title',
      type: 'boolean',
      default: false,
      isLayout: true,
    },
    showMoreText: {
      title: 'admin/editor.collapsible-layout.showMoreText.title',
      type: 'string',
      default: 'Show More',
      isLayout: true,
    },
    showLessText: {
      title: 'admin/editor.collapsible-layout.showLessText.title',
      type: 'string',
      default: 'Show Less',
      isLayout: true,
    },
    minHeight: {
      title: 'admin/editor.collapsible-layout.minHeight.title',
      type: 'number',
      default: 200,
      isLayout: true,
    },
    showGradient: {
      title: 'admin/editor.collapsible-layout.showGradient.title',
      type: 'boolean',
      default: true,
      isLayout: true,
    },
  },
}

export default CollapsibleLayout
