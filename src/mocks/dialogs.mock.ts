import { DialogDTO } from '@/types/Messenger';

export default [
  {
    id: 1,
    subject: 'one',
    created: Date.parse('01.01.2011 10:10:10'),
    lastMessage: {
      id: 3,
      author: 'racoon',
      created: Date.parse('01.01.2011 10:15:10'),
      text: 'Ауриска́льпиум обыкнове́нный[1] (лат. Auriscalpium vulgare) — вид грибов, входящий в род Аурискальпиум (Auriscalpium) семейства Аурискальпиевые (Auriscalpiaceae). Сапротрофы; растут на опавших шишках хвойных деревьев.',
    },
  },
  {
    id: 2,
    subject: 'two',
    created: Date.parse('02.20.2012 12:13:14'),
  },
  {
    id: 3,
    subject: 'duck duck duck duck duck duck duck duck duck duck duck duck duck duck duck duck duck duck duck duck',
    created: Date.parse('03.20.2012 10:13:14'),
  },
  {
    id: 4,
    subject: 'racoon racoon racoon racoon racoon racoon racoon racoon racoon racoon racoon racoon racoon racoon racoon',
    created: Date.parse('03.20.2015 15:13:14'),
  },
  {
    id: 5,
    subject: 'five',
    created: Date.parse('05.05.2005 05:05:05'),
  },
] as DialogDTO[];
