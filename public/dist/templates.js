var jpotsTemplates = {'Layout.lunatic' : '<div class="lunatic" data-handler="lunatic"> <p>  Lunatic ipsum dolor sit amet, consectetur adipiscing elit. Etiam tristique gravida iaculis. Morbi rutrum suscipit ante vitae volutpat. Morbi mauris ante, hendrerit eget volutpat vitae, ultricies eget ipsum. Etiam mollis nisi ac fringilla egestas. Curabitur gravida nunc id elit lobortis viverra. Nulla facilisi. Phasellus nibh mauris, tempus in libero ac, elementum dictum purus. Nam dui lorem, tincidunt vel risus iaculis, porta tempus dui. Pellentesque ultricies risus et leo iaculis, sed pharetra sapien suscipit. Praesent ut efficitur lacus, eget vehicula turpis. </p> <p>  Nulla suscipit diam eu turpis tristique condimentum. Aenean viverra dui eu lorem commodo, eget sagittis risus egestas. Fusce elementum nunc non libero finibus, at tristique sapien porta. Aenean fermentum rhoncus tellus et cursus. Donec lorem augue, tempus nec gravida at, cursus ut ligula. Integer ac ante in dui egestas molestie vitae eget enim. Suspendisse sagittis, quam non sodales condimentum, leo magna tristique nibh, nec posuere sapien ante sit amet mauris. Integer blandit sollicitudin metus vitae scelerisque. Fusce in massa id justo lacinia vehicula et vel nunc. Fusce convallis elit eu urna posuere, a rhoncus orci pellentesque. Integer sed risus placerat, pulvinar sapien in, pulvinar leo. </p> <p>  Phasellus dapibus euismod malesuada. Mauris vestibulum nulla quis enim imperdiet, nec cursus eros blandit. Cras molestie mattis odio sed cursus. Nunc sit amet placerat massa, sit amet suscipit est. Fusce ac blandit massa. Vestibulum faucibus fringilla varius. Ut at magna nec nulla pretium imperdiet. Quisque scelerisque semper libero, eget tempus mi vulputate eu. Maecenas vel ante tincidunt, condimentum turpis ac, ultricies orci. </p></div>', 'Popup.popup' : '<div data-action="popup" data-handler="popup-{{index}}" class="jpots-popup" style="width: {{width}}%; height:{{height}}%"> <h1>PopUp #{{index}} z-index: <span data-handler="z-index"></span></h1> <p>  Test out tab index for the current popup window </p> <form>  <label>Tab Index <input placeholder="#1" /></label>  <label>Tab Index <input placeholder="#2" /></label>  <label>Tab Index <input placeholder="#3" /></label>  <label>Tab Index <input placeholder="#4" /></label>  <label>Tab Index <input placeholder="#5" /></label> </form> <span class="actions">  <button data-action="popup-append">append popup</button>  <button data-action="popup-prepend">prepend popup</button>  <button data-action="popup-close">close popup</button>  <button data-action="popup-close-all">close all popups</button> </span></div>', 'Stats.stats' : '<ul> {{#data}}  <li>   <a href="javascript:void(0);"    data-handler="popup-start"    data-popup="{{name}}">{{parseName}}</a>   <span>z-index: {{zindex}}</span>  </li> {{/data}}</ul>'};