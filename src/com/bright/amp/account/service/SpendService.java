package com.bright.amp.account.service;

import org.springframework.stereotype.Service;

import com.bright.amp.account.dao.TspendDao;
import com.bright.amp.account.model.Tspend;
import com.polydata.framework.core.service.BaseService;

@Service("spendService")
public class SpendService extends BaseService<Tspend,TspendDao>{
	
	public void addSpend(Tspend spend){
		String accdate = spend.getAccdate();
		String date[] = accdate.split("-");
		String accmon = date[0]+"-"+date[1];
		spend.setAccmon(accmon);
		spend.setAccyear(date[0]);
		dao.insert(spend);
	}

	public void updateSpend(Tspend spend){
		String accdate = spend.getAccdate();
		String date[] = accdate.split("-");
		String accmon = date[0]+"-"+date[1];
		spend.setAccmon(accmon);
		spend.setAccyear(date[0]);
		dao.update(spend);
	}
	
	public void delete(Integer[] gids){
		for(Integer gid : gids){
			dao.delete(gid);
		}
	}
}
