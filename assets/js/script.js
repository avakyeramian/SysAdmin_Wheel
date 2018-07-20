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
    
    var document = window.document;
    var alert = window.alert;
    var console = window.console;
    var body = document.body;
    
    /* -- Config -- */
    
    var wheel_items = {};
    wheel_items["Redémarrer"] = "enable";
    wheel_items["Ecran allumé ?"] = "enable";
    wheel_items["Voyant d'alimentation allumé ?"] = "enable";
    wheel_items["Vider le cache"] = "enable";
    wheel_items["Cable branché ?"] = "enable";
    wheel_items["Cable d'alimentation branché ?"] = "enable";
    
    var wheelDiv = document.getElementById("SysAdmin_Wheel");
    
    var print = document.createElement("code");
    print.setAttribute("id","print");
    wheelDiv.append(print);
    
    var boutons = document.createElement("div");
    boutons.setAttribute("id","boutons");
    wheelDiv.append(boutons);
    
    var boutonTourner = document.createElement("button");
    boutonTourner.setAttribute("id","boutonTourner");
    boutonTourner.innerHTML = "Tourner";
    boutons.append(boutonTourner);
    
    var boutonReset = document.createElement("button");
    boutonReset.setAttribute("id","boutonReset");
    boutonReset.innerHTML = "Reset";
    boutons.append(boutonReset);
    
    var options = document.createElement("div");
    options.setAttribute("id","options");
    wheelDiv.append(options);
    
    var import_export_ul = document.createElement("ul");
    import_export_ul.setAttribute("id","import_export");
    wheelDiv.append(import_export_ul);
    
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
    
    var ul_options = document.createElement("ul");
    options.append(ul_options);
    
    print.innerHTML = "Roue initialisée !";
    
    setOptionWheel(wheel_items);
    
    boutonTourner.onclick = turnWheel;
    boutonReset.onclick = resetWheel;
    
    function turnWheel(){
        var indice,taille,attribut,wheel;        
        wheel = setWheel(wheel_items);
        taille = Object.keys(wheel).length;
        if(remainingSolutionWheel(wheel_items)){
            print.innerHTML = "";
            boutonTourner.disabled = false;
            do{
                indice = Math.floor(Math.random() * taille);
                attribut = getAttributByNum(wheel,indice);
            }while(attribut == null)

            print.innerHTML = attribut;
            wheel_items[attribut] = "disable";
            document.getElementById(attribut).checked = false;
            if(remainingSolutionWheel(wheel_items)==false){
                boutonTourner.disabled = true
            }
        }else{
            boutonTourner.disabled = true
        }
    }
    
    function resetWheel(){
        for(var key in wheel_items){
            wheel_items[key] = "enable";
            boutonTourner.disabled = false;
            if(document.getElementById(key)){
                document.getElementById(key).checked = true;
            }
        }
        print.innerHTML = "Roue réinitialisée !";
    }
    
    function setWheel(wheel_items){
        var wheelSeted = {};
        for(var key in wheel_items){
            if(wheel_items[key] == "enable"){
                wheelSeted[key] = "enable";
            }
        }
        return wheelSeted;
    }
    
    function remainingSolutionWheel(wheel_items){
        var bool = false;
        for(var key in wheel_items){
            if(wheel_items[key] == "enable"){
                bool = true;
                boutonTourner.disabled = false;
            }
        }
        return bool;
    }
    
    function getAttributByNum(obj,numAttribut){
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
        
        while (ul_options.firstChild) {
            ul_options.removeChild(ul_options.firstChild);
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
        
        ul_options.append(li_add);
        
        for(var item in wheel_items){
            addOptionWheel(item);
        }
    }
    
    function addOptionWheel(item){
            boutonTourner.disabled = false;
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
                    boutonTourner.disabled = false;
                }else{
                    wheel_items[event.target.id] = "disable";
                    if(remainingSolutionWheel(wheel_items)==false){
                        boutonTourner.disabled = true;
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
        
            ul_options.prepend(li);
    }
    
    function importFile(event){
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