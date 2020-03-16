package com.juniorAssociate.RSI.lifeJacket.Controllers;

import com.juniorAssociate.RSI.lifeJacket.Entities.DevCenter;
import com.juniorAssociate.RSI.lifeJacket.Services.DevCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/DevCenter")
public class DevCenterController {
    @Autowired
    private DevCenterService devCenterService;

    @RequestMapping("/")
    public String Helloworld (){
        return "Tommie is amazing in his DevCenter!!!";
    }

    @PatchMapping(value = "/saveAll")
    public void saveAllDevCenters() {
        devCenterService.saveAllDevCenters();
    }

    @RequestMapping(value = "/findAll")
    public List<DevCenter>findAllDevCenters(){
        return devCenterService.findAllDevCenters();
    }
    //todo figure out what info i will have

    @RequestMapping("/findByLocation")
    public DevCenter findByLocation(@RequestBody String location){
        DevCenter devCenter = devCenterService.findByLocation(location);
        return devCenter;
    }
    //todo figure out what info i will have
    @DeleteMapping(value = "/delete")
    public void delete(@RequestBody String id){
        devCenterService.deleteDevCenter(id);
    }

    @PatchMapping("/save")
    public void saveDevCenter(@RequestBody String id){
        devCenterService.saveDevCenter(id);
    }
}