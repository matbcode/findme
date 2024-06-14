import { onMounted, onUnmounted } from "vue";

/**
 * Mount an event listener on a given element with a callback
 * and remove it when the component is unmounted
 * 
 * @param {HTMLElement} element
 * @param {string} event
 * @param {Function} callback
 * @returns {void}
 */
export function useMountEventListener(element, event, callback) {
    onMounted(() => {
        element.addEventListener(event, callback);
    });

    onUnmounted(() => {
        element.removeEventListener(event, callback);
    });
}