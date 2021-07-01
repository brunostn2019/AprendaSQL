package com.sqlpt.sqlptbr.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SqlptController {


    //region [PAGINAS SQL]

    //retorna a pagina select
    @GetMapping("/editor")
    public String getEditor() {
        return "/editor";
    }

    @RequestMapping({ "/", "/index" })
    public String getPaginaInicial() {
        return "select/index";
    }

    //retorna a pagina select
    @GetMapping("/select")
    public String getSelect() {
        return "select/select";
    }
    //retorna a pagina limit
    @GetMapping("/limit")
    public String getLimit() {
        return "select/limit";
    }
    //retorna a pagina min max
    @GetMapping("/minmax")
    public String getMinMax() {
        return "select/minmax";
    }
    //retorna a pagina distinct
    @GetMapping("/distinct")
    public String getDistinct() {
        return "select/distinct";
    }
    //retorna a pagina where
    @GetMapping("/where")
    public String getWhere() {
        return "select/where";
    }
    //retorna a pagina orderby
    @GetMapping("/orderby")
    public String getOrderBy() {
        return "select/orderby";
    }
    //retorna a pagina andornot
    @GetMapping("/andornot")
    public String getAndOrNot() {
        return "select/andornot";
    }


    //retorna a pagina nullvalues
    @GetMapping("/nullvalues")
    public String getNullValues() {
        return "select/nullvalues";
    }

    //retorna a pagina insert
    @GetMapping("/insert")
    public String getInsert() {
        return "insert";
    }
    //retorna a pagina update
    @GetMapping("/update")
    public String getUpdate() {
        return "update";
    }
    //retorna a pagina delete
    @GetMapping("/delete")
    public String getDelete() {
        return "delete";
    }


    //endregion


}
