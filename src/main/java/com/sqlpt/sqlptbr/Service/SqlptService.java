package com.sqlpt.sqlptbr.Service;

import com.sqlpt.sqlptbr.model.*;

import java.util.List;

public interface SqlptService {
    List<Post> findAll();
    Post findById(Long id);
    Post save(Post post);


}
