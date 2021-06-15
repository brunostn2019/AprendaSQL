package com.sqlpt.sqlptbr.Service.ServiceImpl;
import com.sqlpt.sqlptbr.Repository.PostRepository;
import com.sqlpt.sqlptbr.Service.SqlptService;
import com.sqlpt.sqlptbr.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SqlptServiceImpl implements SqlptService {

    @Autowired
    PostRepository postRepository;



    @Override
    public List<Post> findAll() {
        return postRepository.findAll();
    }

    @Override
    public Post findById(Long id) {
        return postRepository.findById(id).get();
    }

    @Override
    public Post save(Post post) {
        return postRepository.save(post);
    }


}
