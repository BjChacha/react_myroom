export const DRAG_COMPONENT_TYPE = {
    //TEXT: Symbol('drag-component-text'),
    //IMAGE: Symbol('drag-component-image'),
    //VIDEO: Symbol('drag-component-video'),
    //AUDIO: Symbol('drag-component-audio'),
    //CARD: Symbol('drag-component-card'),
    TEXT: 'drag-component-text',
    IMAGE: 'drag-component-image',
    VIDEO: 'drag-component-video',
    AUDIO: 'drag-component-audio',
    CARD: 'drag-component-card',
}

export const DRAG_ITEM_TYPE = {
    //RESIZE: Symbol('drag-item-resize'),
    //TEXT: Symbol('drag-item-text'),
    //IMAGE: Symbol('drag-item-image'),
    //VIDEO: Symbol('drag-item-video'),
    //AUDIO: Symbol('drag-item-audio'),
    //CARD: Symbol('drag-item-card'),
    //BLANK: Symbol('drag-item-blank'),
    RESIZE: 'drag-item-resize',
    TEXT: 'drag-item-text',
    IMAGE: 'drag-item-image',
    VIDEO: 'drag-item-video',
    AUDIO: 'drag-item-audio',
    CARD: 'drag-item-card',
    BLANK: 'drag-item-blank',
}

export const COMPONENT2ITEM = {
    [DRAG_COMPONENT_TYPE.TEXT]: DRAG_ITEM_TYPE.TEXT,
    [DRAG_COMPONENT_TYPE.IMAGE]: DRAG_ITEM_TYPE.IMAGE,
    [DRAG_COMPONENT_TYPE.VIDEO]: DRAG_ITEM_TYPE.VIDEO,
    [DRAG_COMPONENT_TYPE.AUDIO]: DRAG_ITEM_TYPE.AUDIO,
    [DRAG_COMPONENT_TYPE.CARD]: DRAG_ITEM_TYPE.CARD,
}
