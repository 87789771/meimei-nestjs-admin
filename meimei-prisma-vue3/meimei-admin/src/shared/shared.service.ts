import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { customAlphabet, nanoid } from 'nanoid';
import { Request } from 'express';
import axios from 'axios';
import * as iconv from 'iconv-lite';

@Injectable()
export class SharedService {
  /**
   * 构造树型结构数据
   */
  public handleTree(
    data: any[],
    id?: string,
    parentId?: string,
    children?: string,
  ) {
    const config = {
      id: id || 'id',
      parentId: parentId || 'parentId',
      childrenList: children || 'children',
    };

    const childrenListMap = {};
    const nodeIds = {};
    const tree = [];

    for (const d of data) {
      const parentId = d[config.parentId];
      if (childrenListMap[parentId] == null) {
        childrenListMap[parentId] = [];
      }
      nodeIds[d[config.id]] = d;
      childrenListMap[parentId].push(d);
    }

    for (const d of data) {
      const parentId = d[config.parentId];
      if (nodeIds[parentId] == null) {
        tree.push(d);
      }
    }

    for (const t of tree) {
      adaptToChildrenList(t);
    }

    function adaptToChildrenList(o) {
      if (childrenListMap[o[config.id]] !== null) {
        o[config.childrenList] = childrenListMap[o[config.id]];
      }
      if (o[config.childrenList]) {
        for (const c of o[config.childrenList]) {
          adaptToChildrenList(c);
        }
      }
    }
    return tree as any[];
  }

  /* 获取请求IP */
  getReqIP(req: Request): string {
    return (req.ips.length ? req.ips[0] : req.ip).replace('::ffff:', '');
  }

  /* 判断IP是不是内网 */
  IsLAN(ip: string) {
    ip.toLowerCase();
    if (ip == 'localhost') return true;
    let a_ip = 0;
    if (ip == '') return false;
    const aNum = ip.split('.');
    if (aNum.length != 4) return false;
    a_ip += parseInt(aNum[0]) << 24;
    a_ip += parseInt(aNum[1]) << 16;
    a_ip += parseInt(aNum[2]) << 8;
    a_ip += parseInt(aNum[3]) << 0;
    a_ip = (a_ip >> 16) & 0xffff;
    return (
      a_ip >> 8 == 0x7f ||
      a_ip >> 8 == 0xa ||
      a_ip == 0xc0a8 ||
      (a_ip >= 0xac10 && a_ip <= 0xac1f)
    );
  }

  /* 通过ip获取地理位置 */
  async getLocation(ip: string) {
    if (this.IsLAN(ip)) return '内网IP';
    try {
      let { data } = await axios.get(
        `http://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`,
        { responseType: 'arraybuffer' },
      );
      data = JSON.parse(iconv.decode(data, 'gbk'));
      return data.pro + ' ' + data.city;
    } catch (error) {
      return '未知';
    }
  }

  /**
   * @description: AES加密
   * @param {string} msg
   * @param {string} secret
   * @return {*}
   */
  aesEncrypt(msg: string, secret: string): string {
    return CryptoJS.AES.encrypt(msg, secret).toString();
  }

  /**
   * @description: AES解密
   * @param {string} encrypted
   * @param {string} secret
   * @return {*}
   */
  aesDecrypt(encrypted: string, secret: string): string {
    return CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
  }

  /**
   * @description: md5加密
   * @param {string} msg
   * @return {*}
   */
  md5(msg: string): string {
    return CryptoJS.MD5(msg).toString();
  }

  /**
   * @description: 生成一个UUID
   * @param {*}
   * @return {*}
   */
  generateUUID(): string {
    return nanoid();
  }

  /**
   * @description: 生成随机数
   * @param {number} length
   * @param {*} placeholder
   * @return {*}
   */
  generateRandomValue(
    length: number,
    placeholder = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
  ): string {
    const customNanoid = customAlphabet(placeholder, length);
    return customNanoid();
  }
}
