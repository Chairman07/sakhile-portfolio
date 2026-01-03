/**
 * useScrollAnimation Hook
 *
 * Provides intersection observer-based scroll animations
 * for revealing elements as they enter the viewport.
 *
 * @author Sakhile Twala
 */
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

/**
 * Hook for detecting when an element enters the viewport
 * @param {Object} options - Intersection Observer options
 * @returns {[React.RefObject, boolean]} - Ref to attach to element and visibility state
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Memoize options to prevent unnecessary re-renders
  const observerOptions = useMemo(() => ({
    threshold: options.threshold || 0.1,
    rootMargin: options.rootMargin || '0px 0px -50px 0px',
  }), [options.threshold, options.rootMargin]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once visible, stop observing (animate only once)
          observer.unobserve(element);
        }
      },
      observerOptions
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [observerOptions]);

  return [ref, isInView];
}

/**
 * Hook for staggered animations on multiple children
 * Supports two calling patterns:
 * 1. useStaggeredAnimation(itemCount, options) - returns { ref, isInView, getDelay }
 * 2. useStaggeredAnimation(options) - returns [ref, isInView]
 * 
 * @param {number|Object} itemCountOrOptions - Number of items or options object
 * @param {Object} options - Animation options (when first arg is number)
 * @returns {Object|Array} - Depends on calling pattern
 */
export function useStaggeredAnimation(itemCountOrOptions, options = {}) {
  // Determine which calling pattern is being used
  const isObjectFirst = typeof itemCountOrOptions === 'object';
  const actualOptions = isObjectFirst ? itemCountOrOptions : options;
  
  const [ref, isInView] = useInView(actualOptions);
  const staggerDelay = actualOptions.staggerDelay || 100;

  const getDelay = useCallback(
    (index) => `${index * staggerDelay}ms`,
    [staggerDelay]
  );

  // Return array for object-first pattern, object for number-first pattern
  if (isObjectFirst) {
    return [ref, isInView];
  }
  
  return { ref, isInView, getDelay };
}

export default useInView;
