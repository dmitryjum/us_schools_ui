export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

export function openModal(params={}) {
  const payload = {...params, show: true}
  return {
    type: MODAL_OPEN,
    payload
  }
}

export function closeModal(params={}) {
  const payload = {...params, show: false}
  return {
    type: MODAL_CLOSE,
    payload
  }
}