import { DRAG_ITEM_TYPE } from 'client/const';

export const MOCK_ITEMS = [
    {
        id: '1',
        type: DRAG_ITEM_TYPE.TEXT,
        value: "This is a text 1",
        color: '#000000',
        backgroundColor: '#ffffff',
        size: 14,
        width: 120,
        height: 30,
        left: 100,
        top: 100,
        align: 'center',
    },
    {
        id: '2',
        type: DRAG_ITEM_TYPE.TEXT,
        value: "This is a text 2",
        color: '#ffff00',
        backgroundColor: '#ff00ff',
        size: 16,
        width: 200,
        height: 30,
        left: 100,
        top: 150,
        align: 'right',
    },
    {
        id: '3',
        type: DRAG_ITEM_TYPE.TEXT,
        value: "This is a text 3",
        color: '#0000ff',
        backgroundColor: '#ffff00',
        size: 12,
        width: 100,
        height: 20,
        left: 100,
        top: 200,
        align: 'center',
    },
]

