import { strings } from '../locales/i18n';


global.categories = [   {namet:strings("categories.pants_and_overalls"), id:'0'},
                        {namet:strings("categories.swimwear"), id:'1'},
                        {namet:strings("categories.shirts"), id:'2'},
                        {namet:strings("categories.evening_clothes"), id:'3'},
                        {namet:strings("categories.skirts"), id:'4'},
                        {namet:strings("categories.coats_and_jackets"), id:'5'},
                        {namet:strings("categories.sweaters"), id:'6'},
                        {namet:strings("categories.shoes"), id:'7'},
                        {namet:strings("categories.dresses"), id:'8'},
                        {namet:strings("categories.accessories"), id:'9'},
                        {namet:strings("categories.everything"), id:'10'},];

global.currentCategoryID = global.categories.length - 1;
global.categoryChanged = false;
global.currentLocation = {};


global.isFiltered = false; // true when use filter, false otherwise
global.upToDistance = 10;
global.upToPrice = 50;
global.sizes = [];