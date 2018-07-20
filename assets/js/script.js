window.onload = content;


function content()
{
    
    //  Avak Yeramian
    //
    //  GNU GENERAL PUBLIC LICENSE Version 3
    //
    // The GNU General Public License is a free, copyleft license for software and other kinds of works.

    //  The licenses for most software and other practical works are designed to take away your freedom to share and change the works.
    //  By contrast, the GNU General Public License is intended to guarantee your freedom to share and change all versions of a program--to make sure it remains free software for all its users. We, the Free Software Foundation, use the GNU General Public License for most of our software; it applies also to any other work released this way by its authors. You can apply it to your programs, too.
    //
    
    /* -- useless/20 -- */
    
    var document = window.document;
    var alert = window.alert;
    var console = window.console;
    var body = document.body;
    
    /* -- init wheel_items -- */
    
    var wheel_items = {};
    wheel_items["Redémarrer"] = "enable";
    wheel_items["Ecran allumé?"] = "enable";
    wheel_items["Voyant d'alimentation allumé?"] = "enable";
    wheel_items["Vider le cache"] = "enable";
    wheel_items["Cable branché?"] = "enable";
    wheel_items["Cable d'alimentation branché?"] = "enable";
    
    /* -- init dom vars  -- */
    
    var wheel_div = document.getElementById("SysAdmin_Wheel");
    
    var print_div = document.createElement("code");
    print_div.setAttribute("id","print");
    wheel_div.append(print_div);
    
    var boutons_div = document.createElement("div");
    boutons_div.setAttribute("id","boutons");
    wheel_div.append(boutons_div);
    
    var bouton_tourner = document.createElement("button");
    bouton_tourner.setAttribute("id","bouton_tourner");
    bouton_tourner.innerHTML = "Tourner";
    bouton_tourner.onclick = turnWheel;
    boutons_div.append(bouton_tourner);
    
    var bouton_reset = document.createElement("button");
    bouton_reset.setAttribute("id","bouton_reset");
    bouton_reset.innerHTML = "Reset";
    bouton_reset.onclick = resetWheel;
    boutons_div.append(bouton_reset);
    
    var options_div = document.createElement("div");
    options_div.setAttribute("id","options");
    wheel_div.append(options_div);
    
    var import_export_ul = document.createElement("ul");
    import_export_ul.setAttribute("id","import_export");
    wheel_div.append(import_export_ul);
    
    var import_li = document.createElement("li");
    import_export_ul.append(import_li);
    
    var import_title = document.createElement("div");
    import_title.innerHTML = "Importer un fichier :";
    import_li.append(import_title);
    
    var import_input = document.createElement("input");
    import_input.setAttribute("id","import");
    import_input.setAttribute("type","file");
    import_input.setAttribute("accept","text/plain");
    import_input.setAttribute("accept","text/plain");
    import_input.onchange = importFile;
    import_li.append(import_input);
        
    var export_li = document.createElement("li");
    import_export_ul.append(export_li);
    
    var export_title = document.createElement("div");
    export_title.innerHTML = "Exporter vers fichier :";
    export_li.append(export_title);
    
    var export_boutton = document.createElement("button");
    export_boutton.setAttribute("id","export");
    export_boutton.innerHTML = "Télécharger";
    export_boutton.onclick = exportFile;
    export_li.append(export_boutton);
    
    var options_ul = document.createElement("ul");
    options_div.append(options_ul);
    
    /* -- init wheel options ul -- */
    
    setOptionWheel(wheel_items);
    print_div.innerHTML = "Roue initialisée !";

    
    /* -- fonctions -- */
    
    function turnWheel(){
        /*
            
        Turn the wheel of fortune randomly "by deactivating each item" 
            
        */
        
        var indice,taille,attribut,wheel;        
        wheel = setWheel(wheel_items);
        taille = Object.keys(wheel).length;
        if(remainingSolutionWheel(wheel_items)){
            print_div.innerHTML = "";
            bouton_tourner.disabled = false;
            do{
                indice = Math.floor(Math.random() * taille);
                attribut = getAttributByNum(wheel,indice);
            }while(attribut == null)

            print_div.innerHTML = attribut;
            wheel_items[attribut] = "disable";
            document.getElementById(attribut).checked = false;
            if(remainingSolutionWheel(wheel_items)==false){
                bouton_tourner.disabled = true
            }
        }else{
            bouton_tourner.disabled = true
        }
    }
    
    function resetWheel(){
        /*
            
        Re-enable all items of wheel_items
            
        */
        
        for(var key in wheel_items){
            wheel_items[key] = "enable";
            bouton_tourner.disabled = false;
            if(document.getElementById(key)){
                document.getElementById(key).checked = true;
            }
        }
        print_div.innerHTML = "Roue réinitialisée !";
    }
    
    function setWheel(wheel_items){
        /*
            
        Return a wheel_items without disable items
            
        */
        
        var wheelSeted = {};
        for(var key in wheel_items){
            if(wheel_items[key] == "enable"){
                wheelSeted[key] = "enable";
            }
        }
        return wheelSeted;
    }
    
    function remainingSolutionWheel(wheel_items){
        /*
            
        Return a boolean if there are still solutions in wheel_items
            
        */
        
        var bool = false;
        for(var item in wheel_items){
            if(wheel_items[item] == "enable"){
                bool = true;
                bouton_tourner.disabled = false;
            }
        }
        return bool;
    }
    
    function getAttributByNum(obj,numAttribut){
        /*
            
        Get an attribut from a js object by his index number
            
        */
        
        var compteur = 0;
        for(var key in obj){
            if (compteur == numAttribut){
              return key;
            }
            ++compteur;
        }
        return null;
    }
    
    function setOptionWheel(wheel_items){
        /*

        - Delete options_ul old content
        - For each wheel_items make a li
        - Create input to add a new wheel item 

        */
        
        
        while (options_ul.firstChild) {
            options_ul.removeChild(options_ul.firstChild);
        }
        
        var li_add = document.createElement("li");
        
        var boutton_add = document.createElement("button");
        boutton_add.innerHTML = "+";
        boutton_add.onclick = function(event){
            var new_item = event.target.parentElement.lastChild.value;
            if(new_item!=""){
                wheel_items[new_item] = "enable";
                addOptionWheel(new_item);
                event.target.parentElement.lastChild.value = "";
            }
        }
        li_add.append(boutton_add);
        
        var input_checkbox_add = document.createElement("input");
        input_checkbox_add.setAttribute("type","checkbox");
        input_checkbox_add.setAttribute("disabled","disabled");
        li_add.append(input_checkbox_add);
        
        var input_add = document.createElement("input");
        input_add.setAttribute("type","text");
        input_add.setAttribute("placeholder","Ajouter une solution");
        input_add.setAttribute("size","32");
        input_add.onkeyup = function(event){
            if (event.key === "Enter") {
                var new_item = event.target.value;
                if(new_item!=""){
                    wheel_items[new_item] = "enable";
                    addOptionWheel(new_item);
                    event.target.value = "";
                }
            }
        };
        li_add.append(input_add);
        
        options_ul.append(li_add);
        
        for(var item in wheel_items){
            addOptionWheel(item);
        }
    }
    
    function addOptionWheel(item){
            /*
            
            Add a li to options_ul with 
                - remove button
                - enable/disable checkbox
                - the item name
            
            */
        
            bouton_tourner.disabled = false;
            var li = document.createElement("li");
            var div_item = document.createElement("div");
            div_item.innerHTML = item;
            li.append(div_item);
            
            var input_checkbox =  document.createElement("input");
            input_checkbox.setAttribute("id",item);
            input_checkbox.setAttribute("type","checkbox");
            if(wheel_items[item]=="enable") input_checkbox.checked = true;
            input_checkbox.onclick = function(event){
                if(event.target.checked==true){
                    wheel_items[event.target.id] = "enable";
                    bouton_tourner.disabled = false;
                }else{
                    wheel_items[event.target.id] = "disable";
                    if(remainingSolutionWheel(wheel_items)==false){
                        bouton_tourner.disabled = true;
                    }
                }
            }
            div_item.prepend(input_checkbox);
            
            var boutton_rem = document.createElement("button");
            boutton_rem.innerHTML = "−";
            boutton_rem.onclick = function(event){
                var item_rem = event.target.parentElement.lastChild.data;
                delete wheel_items[item_rem];
                event.target.parentElement.parentElement.remove();
            }
        
            div_item.prepend(boutton_rem);
        
            options_ul.prepend(li);
    }
    
    function importFile(event){
        /*
        
        Import a txt file to create a new wheel_items object
        
        */
        
        var input = event.target;

        var reader = new FileReader();
        reader.onload = function(){
            //var text = reader.result;
            //var node = document.getElementById('output');
            //node.innerText = text;
            var lines = reader.result.split('\n');
            var new_wheel_items = {};
            for(var line = 0; line < lines.length; line++){
                if(lines[line]!=""){
                    new_wheel_items[lines[line]] = "enable";
                }
            }
            wheel_items = new_wheel_items;
            setOptionWheel(wheel_items);
            
        }
        reader.readAsText(input.files[0]);
      }
    
    function exportFile(){
        /*
        
        Export wheel_items object to a txt file
        
        */
        
        var string = "";
        
        for(var item in wheel_items){
            if(string!=""){
                string = string+"\r\n";
            }
            string = string+item;
        }        
                    
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(string));
        element.setAttribute('download', "export.txt");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
}