package com.sqlpt.sqlptbr.Controller;

import com.sqlpt.sqlptbr.Service.SqlptService;
import com.sqlpt.sqlptbr.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@Controller
public class SqlptController {

    @Autowired
    SqlptService sqlptService;



    //region [BLOG POST METODOS]
    @RequestMapping(value = "/posts", method = RequestMethod.GET)
    public ModelAndView getPosts() {
        ModelAndView mv = new ModelAndView("posts");
        List<Post> posts = sqlptService.findAll();
        mv.addObject("posts", posts);
        return mv;
    }

    @RequestMapping(value = "/posts/{id}", method = RequestMethod.GET)
    public ModelAndView getPostDetails(@PathVariable("id") Long id) {
        ModelAndView mv = new ModelAndView("postDetails");
        Post post = sqlptService.findById(id);
        mv.addObject("post", post);
        return mv;
    }

    @RequestMapping(value="/newpost",method = RequestMethod.GET)
    public String getPostForm()
    {
        return "postForm";
    }

    @RequestMapping(value="/newpost",method = RequestMethod.POST)
    public String savePost(@Valid Post post, BindingResult result, RedirectAttributes attributes)
    {
        if(result.hasErrors()) {
            attributes.addFlashAttribute("mensagem","Verifique os campos obrigatórios!");
            return "redirect:/newpost";
        }
        post.setData(LocalDate.now());
        sqlptService.save(post);
        return "redirect:/posts";
    }
    //endregion

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
